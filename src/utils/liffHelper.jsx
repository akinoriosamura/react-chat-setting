const liff = window.liff;
let isInit = false;
let error_flg = false;
let name = ""
let profile = {};
let liffInfo = {};

class liffHelper {
  init() {
    console.log("liff init");
    console.log(liff);
    liff.getProfile()
    .then(pr => {
      const name = pr.displayName
      profile = pr
    })
    .catch((err) => {
      console.log('error', err);
    });
    console.log(profile);
    if (!isInit) {
      liff.init(
        {
          liffId: "1626501382-xMvalEMJ"
        },
        data => {
          isInit = true;
          error_flg = true;
        },
        err => {
          console.log('LIFF initialization failed', err)
          error_flg = true;
        }
      ).then(() => {
        liff.getProfile()
        .then(pf => {
          profile = pf;
          console.log('get profile', profile);
        })
        .catch((err) => {
          console.log('get profile error', err);
        });
      })
    } else {
      console.log("liff cannot init");
      error_flg = true;
    }
    console.log("error flg");
    console.log(error_flg);
    console.log("isInit");
    console.log(isInit);
    console.log("log init return");
    return new Promise((resolve, reject) => {
      if (!isInit) {
        liff.init(
          data => {
            liffInfo = data;
            isInit = true;
            console.log("liff finish init");
            resolve();
          },
          err => {
            console.log('Fail to init LIFF, please run inside LINE only');
            reject();
          }
        );
      } else {
        console.log("liff cannot init");
        resolve();
      }
    });
  }

  getLIFFInfo() {
    return liffInfo;
  }

  getProfile() {
    console.log("start getProfile function");
    console.log(isInit);
    console.log(profile.userId);
    return new Promise((resolve, reject) => {
      this.init()
        .then(() => {
          if (isInit && !profile.userId) {
            console.log("if is True");
            liff.getProfile()
              .then(pf => {
                profile = pf;
                console.log('get profile', profile);
                resolve(profile);
              })
              .catch((err) => {
                console.log('get profile error', err);
                reject(err);
              });
          } else {
            console.log('cannnot get user profile');
            console.log(isInit);
            console.log(profile.userId);
            resolve(profile)
          }
        })
        .catch(err => { reject(err) });
    });
  }

  closeWindow() {
    liff.closeWindow();
  }

  openWindow(url, external) {
    liff.openWindow({ url, external });
  }

  sendMessages(messages) {
    const messagesToSend = Array.isArray(messages) ? messages : [messages];
    return new Promise((resolve, reject) => {
      this.init()
        .then(() => {
          liff.sendMessages(messagesToSend)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
export default new liffHelper();