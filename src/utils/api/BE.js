import { get, post } from "@/utils/request";

/**
 * Base Editor设计API接口
 * @param {Object} params - 请求参数
 * @param {Function} onDownloadProgress - 可选的下载进度回调函数
 * @returns {Promise} API响应结果
 */
export const executeBEDesign = async (params, onDownloadProgress) => {
    return post("/baseEditor/execute/", {
        "inputSequence": params.inputSequence,
        "pam": params.pam,
        "spacerLength": params.spacerLength,
        "sgRNAModule": params.sgRNAModule,
        "name_db": params.name_db,
        "base_editing_window": params.BE_windows,
        "type": params.editType,
    }, {
        onDownloadProgress: onDownloadProgress,
    });
}

/**
 * 查询结果接口
 * @param { task_id: string } params
 * @returns {Promise} API响应结果
 */
export const getBEResult = async (params) => {
  return get("/baseEditor/execute/", {
    task_id: params.task_id,
  });
};
