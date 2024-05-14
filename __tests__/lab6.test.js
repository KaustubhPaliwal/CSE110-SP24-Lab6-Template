describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://elaine-ch.github.io/Lab6_Part1_Starter/');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });
    console.log(`Checking product item 1/${prodItemsData.length}`);
    // Make sure the title, price, and image are populated in the JSON
    firstValue = prodItemsData[0];
    if (firstValue.title.length == 0) { allArePopulated = false; }
    if (firstValue.price.length == 0) { allArePopulated = false; }
    if (firstValue.image.length == 0) { allArePopulated = false; }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    // Query select all of the <product-item> elements
  const productItems = await page.$$('product-item');

  // Start with allArePopulated as true
  allArePopulated = true;

  // Loop through each <product-item> element
  for (const item of productItems) {
    // Get the data from each <product-item>
    const data = await item.evaluate(item => {
      return {
        title: item.data.title,
        price: item.data.price,
        image: item.data.image
      };
    });

    // Check if title, price, and image are populated in the JSON for each <product-item>
    if (data.title.length === 0 || data.price.length === 0 || data.image.length === 0) {
      allArePopulated = false;
      break; // If any item is not populated, break the loop
    }
  }

  // Expect allArePopulated to still be true
  expect(allArePopulated).toBe(true);

  }, 10000);

  it('Make sure <product-item> elements are populated', async () => {
    const allArePopulated = await page.$$eval('product-item', prodItems => {
      return prodItems.every(item => {
        const data = item.data;
        return data && data.title && data.title.length > 0 && 
               data.price && data.price > 0 && 
               data.image && data.image.length > 0;
      });
    });
    expect(allArePopulated).toBe(true);
  }, 10000);

  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // Query a <product-item> element using Puppeteer
    const productItem = await page.$('product-item');
  
    // Grab the shadowRoot of that element
    const shadow = await productItem.getProperty('shadowRoot');
  
    // Query the button from the shadowRoot
    const addToCartButton = await shadow.$('button');
  
    // Click the button
    await addToCartButton.click();
  
    // Check the innerText property of the button
    const buttonText = await addToCartButton.evaluate(node => node.innerText);
  
    // Expect the innerText property to be "Remove from Cart"
    expect(buttonText).toBe('Remove from Cart');

    await addToCartButton.click();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    
    // Query select all of the <product-item> elements
    const productItems = await page.$$('product-item');
  
    // Loop through each product element
    for (let i = 0; i < productItems.length; i++) {
      // Get the shadowRoot of each product element
      console.log('Reached' + i);
      const shadow = await productItems[i].getProperty('shadowRoot');
  
      // Query select the button inside each shadowRoot
      const addToCartButton = await shadow.$('button');
  
      // Click on the button
      await addToCartButton.click();
    }
  
    // Check if the innerText of #cart-count is 20
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 30000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
  
    // Reload the page
    await page.reload();
  
    // Select all of the <product-item> elements
    const productItems = await page.$$('product-item');
  
    // Check every element to make sure that all of their buttons say "Remove from Cart"
    for (const product of productItems) {
      // Get the shadowRoot of each product element
      const shadow = await product.getProperty('shadowRoot');
  
      // Query select the button inside each shadowRoot
      const addToCartButton = await shadow.$('button');
  
      // Check if the button text is "Remove from Cart"
      const buttonText = await addToCartButton.evaluate(node => node.innerText);
      expect(buttonText).toBe('Remove from Cart');
    }
  
    // Check to make sure that #cart-count is still 20
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // Get the cart from localStorage
    const cart = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
    });
  
    // Define the expected cart
    const expectedCart = Array.from({ length: 20 }, (_, i) => i + 1);
  
    // Check if the cart in localStorage matches the expected cart
    expect(cart).toEqual(expectedCart);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
  
    // Query select all of the <product-item> elements
    const productItems = await page.$$('product-item');
  
    // Loop through each product element
    for (const product of productItems) {
      // Get the shadowRoot of each product element
      const shadow = await product.getProperty('shadowRoot');
  
      // Query select the button inside each shadowRoot
      const removeFromCartButton = await shadow.$('button');
  
      // Click on the "Remove from Cart" button
      await removeFromCartButton.click();
    }
  
    // Check if #cart-count is now 0
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 30000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
  
    // Reload the page once more
    await page.reload();
  
    // Select all of the <product-item> elements
    const productItems = await page.$$('product-item');
  
    // Loop through each product element
    for (const product of productItems) {
      // Get the shadowRoot of each product element
      const shadow = await product.getProperty('shadowRoot');
  
      // Query select the button inside each shadowRoot
      const addToCartButton = await shadow.$('button');
  
      // Check if the button text is "Add to Cart"
      const buttonText = await addToCartButton.evaluate(node => node.innerText);
      expect(buttonText).toBe('Add to Cart');
    }
  
    // Check if #cart-count is still 0
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 10000);
  

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
  
    // Get the cart from localStorage
    const cart = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
    });
  
    // Check if the cart in localStorage is an empty array
    expect(cart).toEqual([]);
  });
});
