const guard = (permissions?: string[]) => {
  const userPer = "ADMIN"; // process.env.NEXT_PUBLIC_LOCAL_PERMISSION;
  return !permissions ? true : userPer ? permissions.includes(userPer) : false;
};
export default guard;
