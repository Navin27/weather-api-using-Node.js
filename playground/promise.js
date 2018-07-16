var somePromise = new Promise((resolve, reject) =>{
    setTimeout(() => {
      reject();
      resolve('Hey , it worked');
      reject('unable to fulfill the Promise');
    }, 2500);
});

somePromise.then((message) => {
    console.log('Success:',message);
}, (errorMessage) => {
    console.log('Error:', errorMessage);
});
