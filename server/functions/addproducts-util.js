const products = require("./output.json");
const admin = require("./firebase");
const generateHash = require("random-hash").default;

const db = admin.firestore();
let batch = db.batch();
let counter = 0;
let flag = true;

const func = async () => {
  for (let i = 0; i < 466; i++) {
    const product = products[i];
    batch.set(db.doc("products/" + generateHash({ length: 12 })), {
      categories: [],
      desc: product["Item Description"],
      image_alt: product["Item Description"],
      images: [],
      keywords: [],
      name: product["Item Description"],
      variants: {
        [generateHash({ length: 6 })]: {
          actualPrice: product["MRP"],
          barcode: product["Barcode"],
          discountedPrice: product["SALES Price"],
          size: "",
          sku: "",
        },
      },
      visible: false,
    });
  }

  await batch.commit();
  batch = db.batch();

  for (let i = 466; i < 466 * 2; i++) {
    const product = products[i];
    batch.set(db.doc("products/" + generateHash({ length: 12 })), {
      categories: [],
      desc: product["Item Description"],
      image_alt: product["Item Description"],
      images: [],
      keywords: [],
      name: product["Item Description"],
      variants: {
        [generateHash({ length: 6 })]: {
          actualPrice: product["MRP"],
          barcode: product["Barcode"],
          discountedPrice: product["SALES Price"],
          size: "",
          sku: "",
        },
      },
      visible: false,
    });
  }

  await batch.commit();
  batch = db.batch();

  for (let i = 466 * 2; i < 466 * 3; i++) {
    const product = products[i];
    batch.set(db.doc("products/" + generateHash({ length: 12 })), {
      categories: [],
      desc: product["Item Description"],
      image_alt: product["Item Description"],
      images: [],
      keywords: [],
      name: product["Item Description"],
      variants: {
        [generateHash({ length: 6 })]: {
          actualPrice: product["MRP"],
          barcode: product["Barcode"],
          discountedPrice: product["SALES Price"],
          size: "",
          sku: "",
        },
      },
      visible: false,
    });
  }

  await batch.commit();
  batch = db.batch();

  for (let i = 466 * 3; i < 466 * 4; i++) {
    const product = products[i];
    batch.set(db.doc("products/" + generateHash({ length: 12 })), {
      categories: [],
      desc: product["Item Description"],
      image_alt: product["Item Description"],
      images: [],
      keywords: [],
      name: product["Item Description"],
      variants: {
        [generateHash({ length: 6 })]: {
          actualPrice: product["MRP"],
          barcode: product["Barcode"],
          discountedPrice: product["SALES Price"],
          size: "",
          sku: "",
        },
      },
      visible: false,
    });
  }

  await batch.commit();
  batch = db.batch();

  for (let i = 466 * 4; i < 466 * 5; i++) {
    const product = products[i];
    batch.set(db.doc("products/" + generateHash({ length: 12 })), {
      categories: [],
      desc: product["Item Description"],
      image_alt: product["Item Description"],
      images: [],
      keywords: [],
      name: product["Item Description"],
      variants: {
        [generateHash({ length: 6 })]: {
          actualPrice: product["MRP"],
          barcode: product["Barcode"],
          discountedPrice: product["SALES Price"],
          size: "",
          sku: "",
        },
      },
      visible: false,
    });
  }

  await batch.commit();
  console.log("Done");
};

try {
  func();
} catch (e) {
  console.log(e);
}