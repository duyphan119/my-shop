import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  apiDeleteOrderUser,
  apiGetAllOrders,
  apiGetOrdersByUser,
  apiUpdateOrder,
} from "../../../api/apiOrder";
import { apiGetCodesByType } from "../../../api/apiCode";
import { useEffect, useState } from "react";
import { ADMIN_ORDERS_PER_PAGE } from "../../../constants";
import OrderDetailModal from "./OrderDetailModal";
import ConfirmDialog from "../Common/ConfirmDialog";
const Orders = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [codes, setCodes] = useState([]);
  const [p, setP] = useState(0);
  const [orderDetailModal, setOrderDetailModal] = useState({
    open: false,
    item: null,
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    text: "",
    onConfirm: () => {},
  });

  console.log(orders);

  useEffect(() => {
    const callApi = async () => {
      let data = [];
      if (user.role.role === "admin") {
        data = await apiGetAllOrders(user, "", dispatch);
      } else {
        data = await apiGetOrdersByUser(user, dispatch);
      }
      setOrders(data);
    };
    callApi();
  }, [dispatch, p, user]);

  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetCodesByType("ORDER_STATUS");
      setCodes(data);
    };
    callApi();
  }, []);

  const handleDeleteOrder = async (order) => {
    if (order.code.is_default) {
      const isDeleted = apiDeleteOrderUser(user, order.id, dispatch);
      if (isDeleted) {
        setOrders([...orders].filter((item) => item.id !== order.id));
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            {new Date(params.value).toLocaleDateString("vi-VN") +
              " " +
              new Date(params.value).toLocaleTimeString("vi-VN")}
          </>
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 400,
      renderCell: (params) => {
        return (
          <>{`${params.row.address_no} ${params.row.street}, ${params.row.ward}, ${params.row.district}, ${params.row.city}`}</>
        );
      },
    },
    {
      field: "delivery_price",
      headerName: "Vận chuyển",
      width: 100,
      renderCell: (params) => {
        return (
          <>{params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</>
        );
      },
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      renderCell: (params) => {
        return (
          <>{params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</>
        );
      },
    },
    {
      field: "code",
      width: 160,
      headerName: "Trạng thái",
      renderCell: (params) => {
        return user.is_admin ? (
          <select
            defaultValue={params.row.code_id}
            style={{ outline: "none", padding: "5px" }}
            onChange={async (e) => {
              apiUpdateOrder(
                user,
                { code_id: e.target.value, id: params.row.id },
                dispatch
              );
            }}
          >
            {codes.map((code) => (
              <option key={code.id + code.type} value={code.id}>
                {code.value_vi}
              </option>
            ))}
          </select>
        ) : (
          <Chip
            label={params.row.code.value_vi}
            color={params.row.code.code_key.toLowerCase()}
            variant="contained"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{ fontSize: 12 }}
              variant="contained"
              size="small"
              onClick={() =>
                setOrderDetailModal({ open: true, item: params.row })
              }
            >
              Chi tiết
            </Button>
            {!user.is_admin && (
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ fontSize: 12, ml: 1 }}
                disabled={!params.row.code.is_default}
                onClick={() =>
                  setConfirmDialog({
                    ...confirmDialog,
                    open: true,
                    title: "Xác nhận",
                    text: `Bạn có chắc chắn huỷ đơn hàng ${params.row.id} không ?`,
                    onConfirm: () => {
                      handleDeleteOrder(params.row);
                    },
                  })
                }
              >
                Huỷ
              </Button>
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ height: 615, width: "100%", bgcolor: "#fff" }}>
          <DataGrid
            columns={columns}
            rows={orders}
            rowCount={ADMIN_ORDERS_PER_PAGE}
            pageSize={ADMIN_ORDERS_PER_PAGE}
            rowsPerPageOptions={[ADMIN_ORDERS_PER_PAGE]}
            onPageChange={(page) => setP(page)}
            sx={{ fontSize: 12 }}
            components={{
              Toolbar: () => (
                <GridToolbarContainer>
                  <GridToolbarColumnsButton />
                  <GridToolbarFilterButton />
                  <GridToolbarDensitySelector />
                  <GridToolbarExport />
                </GridToolbarContainer>
              ),
            }}
          />
        </Grid>
      </Grid>
      <OrderDetailModal
        open={orderDetailModal.open}
        item={orderDetailModal.item}
        handleClose={() => setOrderDetailModal({ open: false, item: null })}
      />
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        text={confirmDialog.text}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      />
    </>
  );
};

export default Orders;
