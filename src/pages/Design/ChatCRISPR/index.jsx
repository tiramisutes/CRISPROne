import { useState, useRef, useEffect } from 'react';
import { SearchOutlined, SmileOutlined, SendOutlined, RobotOutlined, DeleteOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import Markdown from 'markdown-to-jsx';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { helpItems, crisprQA } from '@/utils/datas/static-data';
import './index.scss';

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = `${import.meta.env.VITE_DEEPSEEK_API_URL}/chat/completions`;

function ChatCRISPR() {
    const [messages, setMessages] = useState([
        {
            text: "您好！我是 CRISPRone 智能助手。我可以帮您解答关于 CRISPR 基因编辑的各种问题，包括 Cas9、Cas12、Base Editor、Prime Editor 等系统的使用方法。请问有什么可以帮您？",
            isUser: false,
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showClearModal, setShowClearModal] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const messagesEndRef = useRef(null);

    // 合并所有问题项（helpItems + crisprQA）
    const allQuestions = [...helpItems, ...crisprQA];
    
    // 过滤问题项
    const filteredHelpItems = allQuestions.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 滚动到底部 - 已禁用自动滚动，让用户手动控制
    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    // 智能匹配相关QA - 根据用户问题自动查找相关的预设答案
    const findRelevantQA = (userQuestion) => {
        const question = userQuestion.toLowerCase().trim();
        
        // 计算文本相似度（简单的词重叠算法）
        const calculateSimilarity = (text1, text2) => {
            const words1 = text1.split(/\s+/);
            const words2 = text2.split(/\s+/);
            const commonWords = words1.filter(word => words2.includes(word) && word.length > 1);
            return commonWords.length / Math.max(words1.length, words2.length);
        };
        
        // 为每个QA计算相关性分数
        const scoredQAs = allQuestions.map(item => {
            const itemQuestion = item.question.toLowerCase();
            const itemAnswer = item.answer.toLowerCase();
            let score = 0;
            
            // 1. 直接文本相似度匹配（最高优先级）
            const questionSimilarity = calculateSimilarity(question, itemQuestion);
            score += questionSimilarity * 100;
            
            // 2. 检查是否包含完整的短语（高优先级）
            if (question.length > 10 && itemQuestion.includes(question)) {
                score += 50;
            }
            if (itemQuestion.length > 10 && question.includes(itemQuestion)) {
                score += 50;
            }
            
            // 3. 关键词匹配
            const keywords = [
                'cas9', 'cas12', 'cas13', 'cpf1', 'c2c1', 'cas12a', 'cas12b',
                'base editor', 'prime editor', 'repair', 'shine', 'sherlock',
                'pam', 'grna', 'sgrna', 'crrna', 'tracrrna',
                'dna', 'rna', '甲基化', '去甲基化', '编辑', '切割',
                '温度', '效率', '脱靶', '突变', '整合', '转座子',
                '棉花', '拟南芥', 'arabidopsis', '病毒', '诱导', '实际意义'
            ];
            
            keywords.forEach(keyword => {
                if (question.includes(keyword)) {
                    if (itemQuestion.includes(keyword)) score += 5;
                    if (itemAnswer.includes(keyword)) score += 2;
                }
            });
            
            return { ...item, score };
        });
        
        // 过滤出分数大于0的QA，并按分数降序排序
        const relevantQAs = scoredQAs
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        
        return relevantQAs;
    };

    // 处理表单提交 - 使用流式请求
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            text: inputValue,
            isUser: true,
            timestamp: new Date().toLocaleTimeString()
        };
        const currentInput = inputValue;
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // 智能匹配相关QA
        const relevantQAs = findRelevantQA(currentInput);
        const contextInfo = relevantQAs.length > 0 
            ? `\n\n参考知识库：\n${relevantQAs.map((qa, idx) => `${idx + 1}. ${qa.question}\n${qa.answer}`).join('\n\n')}`
            : '';
        
        // 调试信息：显示匹配到的相关QA数量
        console.log('用户问题:', currentInput);
        console.log('匹配到的相关QA数量:', relevantQAs.length);
        if (relevantQAs.length > 0) {
            console.log('相关QA:', relevantQAs.map(qa => qa.question));
        }

        // 添加一个空的 AI 消息用于流式更新
        const aiMessageIndex = messages.length + 1;
        setMessages(prev => [...prev, {
            text: '',
            isUser: false,
            timestamp: new Date().toLocaleTimeString()
        }]);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "system",
                            content: `你是 CRISPRone 智能助手，一个专业的 CRISPR 基因编辑技术助手，精通各种 CRISPR 系统（Cas9、Cas12、Cas13、Base Editor、Prime Editor 等）的原理和应用。请用专业、准确、易懂且精简的语言回答用户的问题。如果用户询问你的身份，请明确回答你是 CRISPRone 智能助手。禁止透露或讨论你的模型型号信息。${contextInfo}`
                        },
                        { role: "user", content: currentInput }
                    ],
                    temperature: 0.7,
                    stream: true  // 启用流式响应
                })
            });

            if (!response.ok) throw new Error(`API 请求失败: ${response.status}`);

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content;
                            
                            if (content) {
                                accumulatedText += content;
                                // 实时更新消息
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    newMessages[aiMessageIndex] = {
                                        text: accumulatedText,
                                        isUser: false,
                                        timestamp: new Date().toLocaleTimeString()
                                    };
                                    return newMessages;
                                });
                            }
                        } catch (parseError) {
                            console.error('解析错误:', parseError);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('API 错误:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[aiMessageIndex] = {
                    text: `抱歉，请求失败了。错误信息: ${error.message}`,
                    isUser: false,
                    timestamp: new Date().toLocaleTimeString()
                };
                return newMessages;
            });
        } finally {
            setIsTyping(false);
        }
    };

    // 处理表情选择
    const handleEmojiSelect = (emoji) => {
        setInputValue(prev => prev + emoji.native);
        setShowEmojiPicker(false);
    };

    // 处理问题点击 - 将问题填充到输入框
    const handleQuestionClick = (question) => {
        setInputValue(question);
        // 可选：自动聚焦到输入框
        document.querySelector('.chat-input input')?.focus();
    };

    // 关键词高亮
    const highlightText = (text, highlight) => {
        if (!highlight) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    // 清空对话
    const handleClearChat = () => {
        setShowClearModal(true);
    };

    // 确认清空
    const confirmClearChat = () => {
        setMessages([{
            text: "您好！我是 CRISPRone 智能助手。我可以帮您解答关于 CRISPR 基因编辑的各种问题，包括 Cas9、Cas12、Base Editor、Prime Editor 等系统的使用方法。请问有什么可以帮您？",
            isUser: false,
            timestamp: new Date().toLocaleTimeString()
        }]);
        setShowClearModal(false);
    };

    // 取消清空
    const cancelClearChat = () => {
        setShowClearModal(false);
    };

    // 复制消息内容
    const handleCopyMessage = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            message.success('已复制到剪贴板');
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            message.error('复制失败');
        }
    };

    return (
        <div className="chat-crispr">
            {/* 左侧边栏 */}
            <div className="chat-sidebar">
                <div className="sidebar-header">
                    <div className="search-box">
                        <SearchOutlined className="search-icon" />
                        <input
                            type="text"
                            placeholder="搜索问题..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="conversation-list">
                    <div className="conversation-header">
                        <h3>💡 常见问题</h3>
                        <span className="question-count">{filteredHelpItems.length} 个问题</span>
                    </div>
                    {filteredHelpItems.map(item => (
                        <div
                            key={item.id}
                            className="conversation-item"
                            onClick={() => handleQuestionClick(item.question)}
                            dangerouslySetInnerHTML={{ __html: highlightText(item.question, searchTerm) }}
                        />
                    ))}
                </div>
            </div>

            {/* 右侧聊天区域 */}
            <div className="chat-main">
                {/* 聊天头部 */}
                <div className="chat-header">
                    <div className="ai-avatar">
                        <RobotOutlined />
                    </div>
                    <div className="ai-info">
                        <h3>CRISPRone 智能助手</h3>
                        <p>专业的 CRISPR 技术问答助手</p>
                    </div>
                    <button 
                        className="clear-chat-btn" 
                        onClick={handleClearChat}
                        title="清空对话"
                    >
                        <DeleteOutlined />
                        <span>清空对话</span>
                    </button>
                </div>

                {/* 聊天消息区域 */}
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
                        >
                            {!message.isUser && (
                                <div className="message-avatar">
                                    <RobotOutlined />
                                </div>
                            )}
                            <div className="message-content">
                                <Markdown>{message.text}</Markdown>
                                <div className="message-footer">
                                    <span className="timestamp">{message.timestamp}</span>
                                    {!message.isUser && message.text && (
                                        <button 
                                            className="copy-btn"
                                            onClick={() => handleCopyMessage(message.text, index)}
                                            title="复制内容"
                                        >
                                            {copiedIndex === index ? <CheckOutlined /> : <CopyOutlined />}
                                        </button>
                                    )}
                                </div>
                            </div>
                            {message.isUser && (
                                <div className="message-avatar user-avatar">
                                    You
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                    {isTyping && (
                        <div className="typing-indicator">
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="typing-text">AI 正在思考中...</span>
                        </div>
                    )}
                </div>

                {/* 输入区域 */}
                <div className="chat-input-container">
                    <div className="input-toolbar">
                        <SmileOutlined
                            className="tool-icon"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />

                        {showEmojiPicker && (
                            <div className="emoji-picker-container">
                                <Picker
                                    data={data}
                                    onEmojiSelect={handleEmojiSelect}
                                    theme="light"
                                    previewPosition="none"
                                />
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="chat-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={isTyping ? "AI 正在回复中..." : "输入您的问题..."}
                            disabled={isTyping}
                        />
                        <button type="submit" disabled={isTyping || !inputValue.trim()}>
                            <SendOutlined />
                            <span>发送</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* 清空对话确认弹窗 */}
            <Modal
                title="清空对话"
                open={showClearModal}
                onOk={confirmClearChat}
                onCancel={cancelClearChat}
                okText="确定"
                cancelText="取消"
                centered
                okButtonProps={{ danger: true }}
            >
                <p>确定要清空所有对话记录吗？此操作不可恢复。</p>
            </Modal>
        </div>
    );
}

export default ChatCRISPR;
