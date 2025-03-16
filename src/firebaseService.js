import { auth, db, storage } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, setDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Authentication functions
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const saveUserDetails = async (userId, userDetails) => {
    try {
        await setDoc(doc(db, "users", userId), userDetails, { merge: true });
    } catch (error) {
        console.error("Error saving user details:", error);
    }
};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
            ...user,
            ...userData,
            isLoggedIn: true
        };
    } else {
        throw new Error("No such user in the database!");
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("user");
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out user:", error.message);
        throw new Error(error.message);
    }
};

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent");
    } catch (error) {
        console.error("Error sending password reset email:", error.message);
        throw new Error(error.message);
    }
};

// Product functions
const uploadImage = async (file) => {
    try {
        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error uploading image:", error.message);
        throw new Error("Failed to upload image");
    }
};

export const addProduct = async (product, images) => {
    try {
        const imageUrls = await Promise.all(images.map(image => uploadImage(image)));
        const productWithImages = {
            ...product,
            images: imageUrls,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        const docRef = await addDoc(collection(db, "products"), productWithImages);
        console.log("Added Product ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding product:", error.message);
        throw new Error("Failed to add product");
    }
};

export const updateProduct = async (id, product, newImages) => {
    try {
        let productWithImages = {
            ...product,
            updated_at: new Date().toISOString()
        };

        if (newImages && newImages.length > 0) {
            const imageUrls = await Promise.all(newImages.map(image => uploadImage(image)));
            productWithImages.images = [...productWithImages.images, ...imageUrls];
        }

        const docRef = doc(db, "products", id);
        await updateDoc(docRef, productWithImages);
        console.log("Updated Product ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error updating product:", error.message);
        throw new Error("Failed to update product");
    }
};

export const deleteProduct = async (id) => {
    try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        console.log("Deleted Product ID:", id);
    } catch (error) {
        console.error("Error deleting product:", error.message);
        throw new Error("Failed to delete product");
    }
};

export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched Products:", products);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw new Error("Failed to fetch products");
    }
};

export const getUserInfo = async (uid) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            throw new Error("No user data found");
        }
    } catch (error) {
        console.error("Error fetching user info:", error.message);
        throw new Error(error.message);
    }
};

export const saveUserInfo = async (uid, userInfo) => {
    try {
        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, userInfo, { merge: true });
    } catch (error) {
        console.error("Error saving user info:", error.message);
        throw new Error(error.message);
    }
};

export const updateProductReviews = async (productId, review) => {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
        reviews: arrayUnion(review)
    });
};

export const getOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched Orders:", orders);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw new Error("Failed to fetch orders");
    }
};

export const getCustomers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const customers = [];
        querySnapshot.forEach((doc) => {
            customers.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched Customers:", customers);
        return customers;
    } catch (error) {
        console.error("Error fetching customers:", error.message);
        throw new Error("Failed to fetch customers");
    }
};
export const addOrder = async (order) => {
    try {
        const orderRef = await addDoc(collection(db, "orders"), order);
        return orderRef.id;
    } catch (error) {
        throw new Error("Error adding order: " + error.message);
    }
};

export const updateOrder = async (orderId, order) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, order);
    } catch (error) {
        throw new Error("Error updating order: " + error.message);
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await deleteDoc(orderRef);
    } catch (error) {
        throw new Error("Error deleting order: " + error.message);
    }
};