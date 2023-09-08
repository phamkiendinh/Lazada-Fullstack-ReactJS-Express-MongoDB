import { useState, useEffect } from 'react';
import ProductList from './ProductList';

const ProductApp = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nextProductId, setNextProductId] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products data
        fetch('http://localhost:3001/api/vendor/product/get-all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    setProducts(data.data);
                    setLoading(false);
                } else {
                    throw new Error(data.message || 'Failed to fetch data');
                }
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

        // Fetch category data
        fetch('http://localhost:3001/api/vendor/category/get-all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    setCategories(data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch categories');
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, []);
    const handleDelete = productId => {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
    };

    const handleEdit = (productId, updatedFields) => {
        const updatedProducts = products.map(product => {
            if (product._id === productId) {
                return { ...product, ...updatedFields };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const handleAddProduct = (newProduct) => {
        const updatedProducts = [...products, { ...newProduct, _id: nextProductId }];
        setProducts(updatedProducts);
        setNextProductId(nextProductId + 1);
    };

    const createProduct = (newProductData) => {
        fetch('http://localhost:3001/api/vendor/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProductData),
        })
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === 'OK') {
                handleAddProduct(data.data);
            } else {
                throw new Error(data.message || 'Failed to create product');
            }
        })
        .catch((error) => {
            setError(error);
        });
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <ProductList
                products={products}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={createProduct}
                onCancel={() => { }}
                categories={categories}
            />
        </div>
    );
};

export default ProductApp;
