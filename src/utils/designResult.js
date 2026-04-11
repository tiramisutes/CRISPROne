const DEFAULT_PARAMETER_FIELD_MAP = {
  inputSequence: ["inputSequence", "input_sequence", "inputSequences"],
  sgRNAModule: ["sgRNAModule", "sgrnaModule", "sgRNA_module"],
  pam: ["pam", "pamType"],
  name_db: ["name_db", "targetGenome", "genome"],
  customizedPAM: ["customizedPAM", "customizedPam"],
  spacerLength: ["spacerLength", "spacer_length"],
  BE_windows: ["BE_windows", "base_editing_window"],
  editType: ["editType", "type"],
  upstreamSequenceLength: ["upstreamSequenceLength", "upstream_sequence_length"],
  cas_type: ["cas_type", "casType"],
};

const getErrorMessageFromResponse = (response) => {
  if (!response) {
    return "Design result data not found, please redesign";
  }

  if (typeof response.error === "string") {
    return response.error;
  }

  return (
    response.error?.error ||
    response.error?.msg ||
    response.error?.message ||
    "Design result data not found, please redesign"
  );
};

const getFirstAvailableValue = (source, keys) => {
  if (!source || typeof source !== "object") {
    return undefined;
  }

  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return undefined;
};

export const getTaskIdFromSearchParams = (searchParams) => {
  if (!searchParams) {
    return "";
  }

  return searchParams.get("task_id") || searchParams.get("taskId") || "";
};

export const extractUserParameters = (
  apiParams,
  data,
  parameterFieldMap = DEFAULT_PARAMETER_FIELD_MAP
) => {
  if (apiParams) {
    return apiParams;
  }

  const candidateSources = [
    data?.UserParameters,
    data?.userParameters,
    data?.params,
    data?.request_params,
    data?.requestParams,
    data?.input_params,
    data?.inputParams,
    data,
  ];

  for (const source of candidateSources) {
    if (!source || typeof source !== "object") {
      continue;
    }

    const normalized = Object.entries(parameterFieldMap).reduce(
      (accumulator, [field, keys]) => ({
        ...accumulator,
        [field]: getFirstAvailableValue(source, keys),
      }),
      {}
    );

    const hasValue = Object.values(normalized).some(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (hasValue) {
      return normalized;
    }
  }

  return null;
};

export const resolveDesignResult = async ({
  searchParams,
  locationState,
  executeRequest,
  getRequest,
  createProgressHandler,
  buildTaskParams = (taskId) => ({ task_id: taskId }),
  isReady = (data) => Boolean(data),
}) => {
  const routeTaskId = getTaskIdFromSearchParams(searchParams);
  const apiParams = locationState?.apiParams;

  if (!routeTaskId && !apiParams) {
    return {
      status: "missing",
      error: "Missing task_id in route, please redesign and try again.",
    };
  }

  const response = routeTaskId
    ? await getRequest(buildTaskParams(routeTaskId, apiParams, searchParams))
    : await executeRequest(apiParams, createProgressHandler?.());

  if (!response?.success || !response.data) {
    return {
      status: "error",
      error: getErrorMessageFromResponse(response),
    };
  }

  const data = response.data;

  if (data.msg === "任务正在分析中") {
    return {
      status: "pending",
      error: "Task is still being analyzed. Please open this link again later.",
      data,
      apiParams,
      taskId: routeTaskId,
    };
  }

  if (data.msg === "任务之前执行失败" && data.error) {
    return {
      status: "failed",
      error: data.error || data.msg,
      data,
      apiParams,
      taskId: routeTaskId,
    };
  }

  if (!isReady(data)) {
    return {
      status: "invalid",
      error: data.msg || "Design result data not found, please redesign",
      data,
      apiParams,
      taskId: routeTaskId,
    };
  }

  return {
    status: "success",
    data,
    apiParams,
    taskId: routeTaskId,
  };
};
