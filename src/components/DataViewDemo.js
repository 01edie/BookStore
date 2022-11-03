import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import data from "./../booksStock";

import React, { useEffect, useRef, useState } from "react";

import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import "../DataViewDemo.css";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLayout,
  setSortKey,
  setSortOrder,
  setSortField,
} from "../features/bookstore/cartPageSlice";
import { addItem } from "../features/bookstore/bookCartSlice";
import { InputText } from "primereact/inputtext";

const DataViewDemo = () => {
  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];
  const toast = useRef(null);

  const { products, layout, sortKey, sortOrder, sortField } = useSelector(
    (store) => store.cartPage
  );
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    dispatch(setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const searchHandler = (e) => {
      
      const searchedProducts = data.filter((item) => {
   
        return item.name.toLowerCase().includes(searchKey.toLowerCase());
      });
      dispatch(setProducts(searchedProducts));
    };
    searchHandler();

  },[searchKey,dispatch]);

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      dispatch(setSortOrder(-1));
      dispatch(setSortField(value.substring(1, value.length)));
      dispatch(setSortKey(value));
    } else {
      dispatch(setSortOrder(1));
      dispatch(setSortField(value));
      dispatch(setSortKey(value));
    }
  };

  const addCartHandler = (data) => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Added to Cart",
      life: 1000,
    });
    dispatch(addItem(data));
    console.log(data);
  };

  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img
            src={data.image}
            // onError={(e) =>
            //   (e.target.src =
            //     "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            // }
            alt={data.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">₹ {data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
              onClick={() => addCartHandler(data)}
            ></Button>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
        <Toast ref={toast} />
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-6 lg:col-4 xl:col-3 ">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
          <div className="product-grid-item-content">
            <img
              src={data.image}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">₹ {data.price}</span>
            <Button
              className=""
              onClick={() => addCartHandler(data)}
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
        <Toast ref={toast} />
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-column gap-2 md:flex-row justify-content-between">
        <div className="" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          />
        </div>
        <div className="search-n-layout-container flex gap-2 align-items-center justify-content-between ">
          <span className="p-input-icon-right">
            <i className="pi pi-search" />
            <InputText
              className="p-inputtext-sm mb2 md:text-base"
              placeholder="Search"
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
          </span>
          <div style={{ textAlign: "right" }}>
            <DataViewLayoutOptions
              layout={layout}
              onChange={(e) => dispatch(setLayout(e.value))}
            />
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="dataview-demo">
      <div className="card">
        <DataView
          value={products}
          layout={layout}
          header={header}
          itemTemplate={itemTemplate}
          paginator
          rows={9}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </div>
  );
};

export default DataViewDemo;
