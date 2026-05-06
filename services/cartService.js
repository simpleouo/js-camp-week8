// ========================================
// 購物車服務
// ========================================

const { fetchCart, addToCart, updateCartItem, deleteCartItem, clearCart } = require('../api');
const { validateCartQuantity, formatCurrency } = require('../utils');

/**
 * 取得購物車
 * @returns {Promise<Object>}
 */
async function getCart() {
  // 請實作此函式
  // 提示：呼叫 fetchCart() 取得購物車資料並回傳
  try{
    const cart = await fetchCart();
    return cart;
  }catch(err){
    console.log('取得購物車失敗:', err);
    return null;
  }
}

/**
 * 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>}
 */
async function addProductToCart(productId, quantity) {
  // 請實作此函式
  // 提示：先用 utils validateCartQuantity() 驗證數量，驗證失敗時回傳 { success: false, error: ... }
  // 驗證通過後，呼叫 addToCart() 加入購物車
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const validation = validateCartQuantity(quantity);
    if (!validation.isValid) {
      const { error } = validation;
      return { success: false, error };
    }

    const data = await addToCart(productId, quantity);
    return { success: true, data };
  } catch (err) {
    console.log('加入購物車失敗:', err);
    return { success: false, error: '加入購物車失敗' };
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>}
 */
async function updateProduct(cartId, quantity) {
  // 請實作此函式
  // 提示：先用 utils validateCartQuantity() 驗證數量，驗證失敗時回傳 { success: false, error: ... }
  // 驗證通過後，呼叫 updateCartItem() 更新數量
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const validation = validateCartQuantity(quantity);
    if (!validation.isValid) {
      const { error } = validation;
      return { success: false, error };
    }
    
    const data = await updateCartItem(cartId, quantity);
    return { success: true, data };
  } catch (err) {
    console.log('更新購物車失敗:', err);
    return { success: false, error: '更新購物車失敗' };
  }
}

/**
 * 移除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>}
 */
async function removeProduct(cartId) {
  // 請實作此函式
  // 提示：呼叫 deleteCartItem()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const data = await deleteCartItem(cartId);
    return { success: true, data };
  } catch (err) {
    console.log('刪除購物車商品失敗:', err);
    return { success: false, error: '刪除購物車商品失敗' };
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>}
 */
async function emptyCart() {
  // 請實作此函式
  // 提示：呼叫 clearCart()
  // 回傳格式：{ success: true, data: ... }
  try{
    const data = await clearCart();
    return { success: true, data };
  } catch (err) {
    console.log('清空購物車失敗:', err);
    return { success: false, error: '清空購物車失敗' };
  }
}

/**
 * 計算購物車總金額
 * @returns {Promise<Object>}
 */
async function getCartTotal() {
  // 請實作此函式
  // 提示：呼叫 fetchCart() 取得購物車資料
  // 回傳格式：{ total: 原始金額, finalTotal: 折扣後金額, itemCount: 商品筆數 }
  try{
    const cart = await fetchCart();
    const { total, finalTotal, carts } = cart;
    const itemCount = carts ? carts.length : 0;
    return { total, finalTotal, itemCount };
  }catch(err){
    console.log('取得購物車總金額失敗:', err);
    return null;
  }
}

/**
 * 顯示購物車內容
 * @param {Object} cart - 購物車資料
 */
function displayCart(cart) {
  // 請實作此函式
  // 提示：先判斷購物車是否為空（cart.carts 不存在或長度為 0），若空則輸出「購物車是空的」
  // 會使用到 utils formatCurrency() 來格式化金額
  //
  // 預期輸出格式：
  // 購物車內容：
  // ----------------------------------------
  // 1. 產品名稱
  //    數量：2
  //    單價：NT$ 800
  //    小計：NT$ 1,600
  // ----------------------------------------
  // 商品總計：NT$ 1,600
  // 折扣後金額：NT$ 1,600
  if (!cart.carts || cart.carts.length === 0) {
    console.log('購物車是空的');
    return;
  }
  console.log('購物車內容：');
  console.log('----------------------------------------');
  cart.carts.forEach((item, index) => {
    const { product, quantity } = item;
    const subtotal = product.price * quantity;
    console.log(`${index + 1}. ${product.title}`);
    console.log(`數量：${quantity}`);
    console.log(`單價：${formatCurrency(product.price)}`);
    console.log(`小計：${formatCurrency(subtotal)}`);
    console.log('----------------------------------------');
  });
  console.log(`商品總計：${formatCurrency(cart.total)}`);
  console.log(`折扣後金額：${formatCurrency(cart.finalTotal)}`);
}

module.exports = {
  getCart,
  addProductToCart,
  updateProduct,
  removeProduct,
  emptyCart,
  getCartTotal,
  displayCart
};
