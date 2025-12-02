import {test as baseTest} from '@playwright/test'

interface TestDataForOrder{ 
  username: string;
  password: string;
  productName: string;
}

export const customtest = baseTest.extend<{testDataForOrder : TestDataForOrder}>({
  testDataForOrder: {
    username: "avishkargawali120@gmail.com",
    password: "Avishkar9730",
    productName: "iphone 13 pro",
  },
});

