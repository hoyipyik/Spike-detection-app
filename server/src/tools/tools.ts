export const backmsg = (flag: boolean, msg: string, data: any = {}) => {
  // console.log(flag, msg, data);
  return {
    flag: flag,
    msg: msg,
    data: data,
  };
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


