import React, { Component } from "react";
import PropTypes from "prop-types";
import { ResourceList, TextStyle } from "@shopify/polaris";
class ProductFeed extends Component {
  state = {
    selectedItems: []
  };

  handleSelectionChange = selectedItems => {
    this.setState({ selectedItems });
  };

  renderItem = item => {
    const { id, title, body_html, product_type } = item;

    return (
      <ResourceList.Item
        id={id}
        accessibilityLabel={`View details for ${title}`}
      >
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <div>{body_html}</div>
        <h3>
          <TextStyle variation="subdued">{product_type}</TextStyle>
        </h3>
      </ResourceList.Item>
    );
  };

  render() {
    const { products } = this.props;

    const resourceName = {
      singular: "product",
      plural: "products"
    };

    const promotedBulkActions = [
      {
        content: "Edit products",
        onAction: () => console.log("Todo: implement bulk edit")
      }
    ];

    const bulkActions = [
      {
        content: "Add tags",
        onAction: () => console.log("Todo: implement bulk add tags")
      },
      {
        content: "Remove tags",
        onAction: () => console.log("Todo: implement bulk remove tags")
      },
      {
        content: "Delete products",
        onAction: () => console.log("Todo: implement bulk delete")
      }
    ];

    return (
      <ResourceList
        resourceName={resourceName}
        items={products}
        renderItem={this.renderItem}
        selectedItems={this.state.selectedItems}
        onSelectionChange={this.handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
      />
    );
  }
}

ProductFeed.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductFeed;
