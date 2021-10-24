const IP_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

// ------------validateRecord
// helper function to check if line is valid path-ip pair
type validateRecordType = (str: string) => false | string[];
export const validateRecord: validateRecordType = (str) => {
  //check if empty
  if (str === "") return false;
  const s = str.split(" ");
  //check if contain only two items and ip valid
  if (s.length !== 2 || !IP_REGEX.test(s[1])) return false;

  return s;
};

// ------------getTotalView
// function is with O(n)
// used Map in 1st design, changed to object for easier-to-read UI rendering
type getTotalViewType = (str: string) => PageViewCount;

export const getTotalView: getTotalViewType = (str) => {
  const records = str.split(/\r?\n/);

  let result: PageViewCount = {};

  records.forEach((record) => {
    const s = validateRecord(record);
    if (!s) return;
    result[s[0]] = (result[s[0]] ?? 0) + 1;
  });

  return result;
};

// ------------getUniqueView
// function is with O(n)
// used extra memory to keep track of each path and ip in order to achieve O(n)
type getUniqueViewType = (str: string) => PageViewCount;

export const getUniqueView: getUniqueViewType = (str) => {
  const records = str.split(/\r?\n/);

  let mapper: Record<string, Set<string>> = {};
  let result: PageViewCount = {};

  records.forEach((record) => {
    const s = validateRecord(record);
    if (!s) return;

    //put into map as set
    mapper[s[0]] = (mapper[s[0]] ?? new Set<string>()).add(s[1]);
    //recalculate views
    result[s[0]] = mapper[s[0]]?.size ?? 0;
  });

  return result;
};
