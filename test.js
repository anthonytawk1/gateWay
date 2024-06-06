// const jwt = require("jsonwebtoken");


// let object = 
// {
//     "IsSuccess": true,
//     "Message": "Invoice Created Successfully!",
//     "ValidationErrors": null,
//     Data: {
//         "InvoiceId": 4010398,
//         "IsDirectPayment": false,
//         "PaymentURL": "https://demo.MyFatoorah.com/Ar/KWT/PayInvoice/Checkout?invoiceKey=01072401039841-aa0f5536&paymentGatewayId=20",
//         "CustomerReference": null,
//         "UserDefinedField": null,
//         "RecurringId": ""
//     }
// }
// console.log(Object.keys(object.Data)[0]);
// console.log(object.length)
// for (let i in object){
//     console.log(Object.keys(object)[i]);
// }

// const token = jwt.sign(
//     {
//       email: "userFound.email",
//       userId: "userFound._id.toString()",
//     },
//     "config.jwt.accessToken" ,
//     { expiresIn: "1h" }
//   );
  
//     console.log(token)
let response = {
  "IsSuccess": true,
  "Message": "Initiated Successfully!",
  "ValidationErrors": null,
  "Data": {
      "PaymentMethods": [
          {
              "PaymentMethodId": 7,
              "PaymentMethodAr": "البطاقات المدينة  قطر",
              "PaymentMethodEn": "QPay",
              "PaymentMethodCode": "np",
              "IsDirectPayment": false,
              "ServiceCharge": 2.6,
              "TotalAmount": 102.6,
              "CurrencyIso": "KWD",
              "ImageUrl": "https://demo.myfatoorah.com/imgs/payment-methods/np.png",
              "IsEmbeddedSupported": false,
              "PaymentCurrencyIso": "QAR"
          },
          {
              "PaymentMethodId": 6,
              "PaymentMethodAr": "مدى",
              "PaymentMethodEn": "MADA",
              "PaymentMethodCode": "md",
              "IsDirectPayment": false,
              "ServiceCharge": 1,
              "TotalAmount": 100,
              "CurrencyIso": "KWD",
              "ImageUrl": "https://demo.myfatoorah.com/imgs/payment-methods/md.png",
              "IsEmbeddedSupported": true,
              "PaymentCurrencyIso": "SAR"
          }
      ]
  }
}
console.log(response.Data.PaymentMethods.length)