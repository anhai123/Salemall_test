import {
  Card,
  Descriptions,
  Pagination,
  Checkbox,
  Space,
  Rate,
  Typography,
  message,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const ProductCard = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  const pathname = window.location.pathname
  const handleClickImageEvent = () => { };
  const handelDeleteProduct = () => { };
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged;
  const confirm = (e) => {
    console.log(e);
    deleteProduct(product._id);
  };
  const cancel = (e) => {
    console.log(e);
  };
  return (
    <>
      <Card
        hoverable
        bordered={true}
        className="card-layout"
        cover={
          <img
            alt="example"
            src={product.images}
            className="postImage"
            onClick={() => handleClickImageEvent(product)}
          />
        }
        actions={
          isAdmin && [
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>,
            <Checkbox
              key="checkbox"
              checked={product.checked}
              onClick={() => handleCheck(product._id)}
            />,
          ]
        }
      >
        {/* {pathname == "/shopping/"? (

        )} */}
        <Link
          to={
            isAdmin ? `edit_product/${product._id}` : pathname == "/shopping/" ? `detail/${product._id}` : `../detail/${product._id}`
          }
          replace={true}
        >
          <Meta
            title={product.title}
            description={
              <>
                <Text code strong style={{ marginRight: '8px' }}>
                  {isLogged ? `${product.price}  VND` : 'Liên hệ'}
                </Text>
                <Text
                  style={{ width: "120px" }}
                  ellipsis={{
                    rows: 3,
                  }}
                >
                  {product.content}
                </Text>
              </>
            }
          />
        </Link>
      </Card>
    </>
  );
};
export default ProductCard;
