export const getRest = function getInfo(url: string) {
  return new Promise((resolve, reject) => {
    fetch(`${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(
        (response) => response.json(),
        () => {
          reject();
          return null;
        }
      )
      .then((data) => {
        if (data) {
          resolve(data);
        }
      });
  });
};
