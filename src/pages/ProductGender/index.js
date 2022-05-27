import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { isShowCollapse, isShowLoadMore } from "../../components/Button";
import ProductSkeleton from "../../components/Skeleton/Product";
import Product from "../../components/Product";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_BANNER_URL,
  API_PRODUCT_URL,
  PRODUCTS_PER_PAGE,
} from "../../constants";
import BannerSlider from "../../components/BannerSlider";
import { TitleCenter } from "../../components/Title";

const ProductGender = ({ genderCategory }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState();
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);
  const [callFirstApi, setCallFirstApi] = useState(false);
  const [banners, setBanners] = useState([]);

  const location = useLocation();

  useEffect(() => {
    let array = [];
    document.title = genderCategory.name;
    genderCategory.group_categories.forEach((group_category) => {
      group_category.categories.forEach((category) => {
        array.push(category);
      });
    });
    if (array?.length > 0) {
      setCategories(array);
    }
  }, [genderCategory]);

  useEffect(() => {
    (async function () {
      try {
        const promises = [];
        promises.push(
          new Promise((resolve, reject) =>
            resolve(
              configAxiosResponse().get(
                `${API_BANNER_URL}?page=${location.pathname}&position=under-header&isShow=true`
              )
            )
          )
        );
        promises.push(
          new Promise((resolve, reject) =>
            resolve(
              configAxiosAll(user, dispatch).get(
                `${API_PRODUCT_URL}/gender/${genderCategory.slug}?limit=${limit}`
              )
            )
          )
        );
        const listRes = await Promise.allSettled(promises);

        if (listRes[0].status === "fulfilled") {
          setBanners(listRes[0].value);
        }
        if (listRes[1].status === "fulfilled") {
          setProduct(listRes[1].value);
          setCallFirstApi(true);
        }
      } catch (error) {}
    })();
  }, [genderCategory, dispatch, limit, user, location.pathname]);
  return (
    <>
      <Box>
        <BannerSlider banners={banners} />
      </Box>
      <Box>
        <Container>
          <TitleCenter>Mua theo thể loại</TitleCenter>
          <Grid container spacing={2}>
            {categories?.map((category) => {
              if (!category.icon) return "";
              return (
                <Grid
                  item
                  sm={3}
                  sx={{
                    maxWidth: {
                      lg: "20% !important",
                    },
                    flexBasis: {
                      lg: "20% !important",
                    },
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                  key={category.slug + Math.random()}
                >
                  <Box
                    sx={{
                      height: "120px",
                      textTransform: "capitalize",
                      backgroundColor: "#e3dede7a",
                    }}
                  >
                    <Link
                      to={`/${category.slug}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "#000",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={category.icon}
                        alt=""
                        style={{
                          marginBottom: "5px",
                        }}
                      />
                      {category.name}
                    </Link>
                  </Box>
                </Grid>
              );
            })}
            <Grid
              item
              xs={12}
              sx={{
                display: {
                  sm: "none",
                },
              }}
            >
              <Slider
                {...{
                  arrows: false,
                  draggable: true,
                  slidesToShow: 3,
                  autoplay: true,
                  autoplaySpeed: 3000,
                }}
              >
                {categories?.map((category) => {
                  return (
                    <Box
                      key={category.slug + Math.random()}
                      sx={{
                        height: "120px",
                        textTransform: "capitalize",
                        backgroundColor: "#e3dede7a",
                      }}
                    >
                      <Link
                        to={`/${category.slug}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                          color: "#000",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={category.icon}
                          alt=""
                          style={{
                            marginBottom: "5px",
                          }}
                        />
                        {category.name}
                      </Link>
                    </Box>
                  );
                })}
              </Slider>
            </Grid>
          </Grid>
          <TitleCenter>Đề xuất cho bạn</TitleCenter>
          <Grid container spacing={2}>
            {product && product.items?.length !== 0 ? (
              product.items?.map((product) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  sx={{
                    maxWidth: {
                      lg: "20% !important",
                    },
                    flexBasis: {
                      lg: "20% !important",
                    },
                  }}
                  key={product.id + Math.random()}
                >
                  <Product product={product} />
                </Grid>
              ))
            ) : callFirstApi ? (
              <Grid item xs={12}>
                <div className="no-result">
                  Không có sản phẩm trong danh mục này
                </div>
              </Grid>
            ) : (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                sx={{
                  maxWidth: {
                    lg: "20% !important",
                  },
                  flexBasis: {
                    lg: "20% !important",
                  },
                }}
              >
                <ProductSkeleton />
              </Grid>
            )}
          </Grid>
          <Box textAlign="center" my={1}>
            {isShowLoadMore(product, PRODUCTS_PER_PAGE, () =>
              setLimit(limit + PRODUCTS_PER_PAGE)
            )}
            {isShowCollapse(product, PRODUCTS_PER_PAGE, () =>
              setLimit(PRODUCTS_PER_PAGE)
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductGender;
