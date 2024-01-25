import React, { useContext, useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { Rate, Card, Image, Row, Col, Typography, Button, message } from "antd";
import ProductCard from "../product/ProductCard";
import StarRatings from "react-star-ratings";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
const { Text, Title } = Typography;
const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isLogged] = state.userAPI.isLogged;
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          console.log('product founded')
          setProductDetail(product);
        }
      });
    }
  }, [params.id, products, state.productsAPI.products[products]]);
  console.log(productDetail)
  return (
    <div>
      {
        products.length > 0 &&
        (
          <>
            <Card className="product-description-containner">
              <div>
                <BackButton />
              </div>
              <div className="description-containner1">
                <Image className="image" src={productDetail.images} />
                <Card
                  title={productDetail.title}
                  bordered={false}
                  style={{ width: "50%" }}
                >
                  <p>
                    <Text code strong>
                      {isLogged ? `VND ${productDetail.price}` : 'Liên hệ'}
                    </Text>
                  </p>
                  <p>{productDetail.content}</p>
                  <p>
                  </p>
                </Card>
              </div>
            </Card>
            <div className="related-product-containner--header">
              <Title level={1}>Sản phẩm liên quan</Title>

            </div>
            <div className="related-product-containner--body">
              {products.map((product) =>
                product.category === productDetail.category ? (
                  <ProductCard key={product._id} product={product} />
                ) : null
              )}
            </div>
          </>
        )

      }

    </div>
  );
};
export default ProductDetail;
