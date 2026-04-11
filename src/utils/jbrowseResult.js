const stripSeparators = (value) => value.replaceAll(",", "");

const formatCoordinate = (value) => value.toLocaleString("en-US");

const parseLocation = (input) => {
  if (!input || typeof input !== "string" || !input.includes(":")) {
    return null;
  }

  const normalizedInput = input.replace(/\s+/g, "");
  const colonIndex = normalizedInput.lastIndexOf(":");

  if (colonIndex === -1) {
    return null;
  }

  const refName = normalizedInput.slice(0, colonIndex);
  const suffix = normalizedInput.slice(colonIndex + 1);

  if (!refName || !suffix) {
    return null;
  }

  const rangeMatch = suffix.match(/^(-?[\d,]+)(?:\.\.|-)(-?[\d,]+)$/);
  if (rangeMatch) {
    const start = Number.parseInt(stripSeparators(rangeMatch[1]), 10);
    const end = Number.parseInt(stripSeparators(rangeMatch[2]), 10);

    if (Number.isNaN(start) || Number.isNaN(end)) {
      return null;
    }

    return { refName, start, end };
  }

  const singleMatch = suffix.match(/^(-?[\d,]+)(?:\.\.|-)?$/);
  if (singleMatch) {
    const start = Number.parseInt(stripSeparators(singleMatch[1]), 10);

    if (Number.isNaN(start)) {
      return null;
    }

    return { refName, start, end: start };
  }

  return null;
};

export const normalizeLocString = (input) => {
  const parsedLocation = parseLocation(input);

  if (!parsedLocation) {
    return input;
  }

  const { refName, start, end } = parsedLocation;
  return `${refName}:${formatCoordinate(start)}..${formatCoordinate(end)}`;
};

export const calculateLocus = (input, n = 20) => {
  const parsedLocation = parseLocation(input);

  if (!parsedLocation) {
    return input;
  }

  const adjustedStart = Math.max(1, parsedLocation.start - 5);
  const adjustedEnd = adjustedStart + n;

  return normalizeLocString(`${parsedLocation.refName}:${adjustedStart}..${adjustedEnd}`);
};

export const processUrl = (url) => {
  if (!url) return url;

  const apiIndex = url.indexOf("/api/");
  if (apiIndex !== -1) {
    return url.substring(apiIndex);
  }

  if (url.startsWith("/api/")) {
    return url;
  }

  return url;
};

export const processMdAndSequence = (md, sequence) => {
  if (!md || !sequence) return sequence;

  let processedSeq = "";
  let seqIndex = 0;
  let i = 0;

  while (i < md.length && seqIndex < sequence.length) {
    let num = "";
    while (i < md.length && /\d/.test(md[i])) {
      num += md[i];
      i++;
    }
    if (num) {
      const segmentLength = parseInt(num, 10);
      processedSeq += sequence.slice(seqIndex, seqIndex + segmentLength);
      seqIndex += segmentLength;
    }
    if (i < md.length && /[A-Z]/.test(md[i])) {
      if (seqIndex < sequence.length) {
        processedSeq += `<span style="color:red;">${sequence[seqIndex]}</span>`;
        seqIndex++;
      }
      i++;
    }
  }

  return processedSeq;
};
