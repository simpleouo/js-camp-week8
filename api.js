// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
    console.log('API URL:', apiUrl);
    const response = await axios.get(apiUrl);
    return response.data.products;
  } catch (err) {
    console.log('取得產品列表失敗:', err);
    return null;
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await axios.get(apiUrl);
    console.log('購物車資料:', response.data);
    const { carts, total, finalTotal } = response.data;
    return { carts, total, finalTotal };
  } catch (err) {
    console.log('取得購物車失敗:', err);
    return null;
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const data = {
      data: {
        productId,
        quantity
      }
    };
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (err) {
    console.log('加入購物車失敗:', err);
    return null;
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const data = {
      data: {
        id: cartId,
        quantity
      }
    };
    const response = await axios.patch(apiUrl, data);
    return response.data;
  } catch (err) {
    console.log('更新購物車商品數量失敗:', err);
    return null;
  }
}
// updateCartItem('carts_7ykEsn3ymycZ0FGiowMq', 5).then(result => {
//   if (result) {
//     console.log('更新購物車商品數量成功:', result);
//   } else {
//     console.log('更新購物車商品數量失敗');
//   }
// });
/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`;
    const response = await axios.delete(apiUrl);
    return response.data;
  } catch (err) {
    console.log('刪除購物車商品失敗:', err);
    return null;
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await axios.delete(apiUrl);
    return response.data;
  } catch (err) {
    console.log('清空購物車失敗:', err);
    return null;
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`;
    const data = {
      data: {
        user: userInfo
      }
    };
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (err) {
    console.log('建立訂單失敗:', err);
    return null;
  } 
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
    const headersData = {
      headers: {
        authorization: ADMIN_TOKEN
      }
    };
    const response = await axios.get(apiUrl, headersData);
    return response.data.orders;
  } catch (err) {
    console.log('取得訂單列表失敗:', err);
    return null;
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
    const headersData = {
      headers: {
        authorization: ADMIN_TOKEN
      }
    };
    const data = {
      data: {
        id: orderId,
        paid: isPaid
      }
    };
    const response = await axios.put(apiUrl, data, headersData);
    return response.data;
  } catch (err) {
    console.log('更新訂單狀態失敗:', err);
    return null;
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  try {
    const apiUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`;
    const headersData = {
      headers: {
        authorization: ADMIN_TOKEN
      }
    };
    const response = await axios.delete(apiUrl, headersData);
    return response.data;
  } catch (err) {
    console.log('刪除訂單失敗:', err);
    return null;
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
