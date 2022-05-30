import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatThousandDigits, getTotalPage } from "../../utils";
import config from "../../config";
import { getSelectedCartItems } from "../../redux/cartSlice";
const CartResult = () => {
  const cart = useSelector((state) => state.cart.cart);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCheckOut = () => {
    if (selectedCartItems.items.length > 0) {
      navigate(config.routes.checkout);
    }
  };

  function handleChange(e) {
    if (e.target.checked) {
      dispatch(getSelectedCartItems(cart));
    } else {
      dispatch(getSelectedCartItems({ items: [], count: 0 }));
    }
  }

  return (
    <>
      <div className="cart-result-wrapper">
        <div className="cart-result-left">
          <div className="cart-result-check-all">
            <FormControlLabel
              control={
                <Checkbox
                  id="cart-result-check-all"
                  checked={cart.items.length === selectedCartItems.items.length}
                  onChange={handleChange}
                />
              }
            />
            <label
              htmlFor="cart-result-check-all"
              className="hover-color-main-color cursor-pointer"
            >
              Chọn tất cả
            </label>
          </div>
          <Button
            color="error"
            size="small"
            variant="outlined"
            onClick={handleCheckOut}
          >
            Xoá
          </Button>
        </div>
        <div className="cart-result-right">
          <div className="cart-result-total">
            Tổng cộng: {formatThousandDigits(getTotalPage(selectedCartItems))}đ
          </div>
          <Button color="primary" variant="contained" onClick={handleCheckOut}>
            THANH TOÁN
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartResult;
