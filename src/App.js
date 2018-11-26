import React, { Component } from "react";
import HeaderForm from "./components/HeaderForm";
import HidePaypalCart from "./components/HidePaypalCartForm";
import HideShopifyPoweredByForm from "./components/HideShopifyPoweredByForm";
import {
  AppProvider,
  Navigation,
  TopBar,
  Card,
  ActionList,
  Loading,
  Layout,
  FormLayout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Modal,
  TextField,
  Frame,
  SkeletonPage
} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

class App extends Component {
  defaultState = {
    emailFieldValue: "Ayoub@youbb.us",
    nameFieldValue: "Ayoub Youb",
    header: <HeaderForm />,
    hidePaypalCart: <HidePaypalCart />,
    hideShopifyPoweredBy: <HideShopifyPoweredByForm />
  };

  state = {
    isLoading: false,
    searchActive: false,
    searchText: "",
    userMenuOpen: false,
    showMobileNavigation: false,
    modalActive: false,
    storeName: this.defaultState.nameFieldValue,
    supportSubject: "",
    supportMessage: "",
    loadingPage: this.defaultState.header
  };
  render() {
    const {
      isLoading,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      modalActive,
      storeName,
      loadingPage
    } = this.state;

    const userMenuActions = [
      {
        items: [
          {
            content: "Back to Shopify",
            icon: "arrowLeft"
          }
        ]
      },
      {
        items: [
          {
            content: "Community forums"
          }
        ]
      }
    ];

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name="USER"
        detail={storeName}
        initials="U"
        open={userMenuOpen}
        onToggle={this.toggleState("userMenuOpen")}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            {
              content: "Shopify help center"
            },
            {
              content: "Community forums"
            }
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState("showMobileNavigation")}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          title="Settings"
          items={[
            {
              label: "Welcome Header Bar",
              icon: "circleChevronRight",
              onAction: this.toggleState("header")
            },
            {
              label: "Hide Paypal Cart",
              icon: "circleChevronRight",
              onAction: this.toggleState("paypal")
            },
            {
              label: "Hide Powerd By Shopify",
              icon: "circleChevronRight",
              onAction: this.toggleState("shopify")
            },
            {
              label: "Hide Best Selling",
              icon: "circleChevronRight",
              onAction: this.toggleState("best")
            },
            {
              label: "Add To Cart Sticky",
              icon: "circleChevronRight"
            },
            {
              label: "Add To Cart Animated",
              icon: "circleChevronRight"
            },
            {
              label: "Back To Top",
              icon: "circleChevronRight"
            },
            {
              label: "Currency Converter",
              icon: "circleChevronRight"
            },
            {
              label: "Countdown Timer",
              icon: "circleChevronRight"
            },
            {
              label: "Payment Icons",
              icon: "circleChevronRight"
            },
            {
              label: "Facebook Multi Pixel's",
              icon: "circleChevronRight"
            },
            {
              label: "Related Products",
              icon: "circleChevronRight"
            },
            {
              label: "YouBB Reviews",
              icon: "circleChevronRight"
            }
          ]}
        />
        <Navigation.Section
          title="Support"
          items={[
            {
              label: "Help center",
              icon: "help"
            }
          ]}
          separator
          action={{
            icon: "conversation",
            accessibilityLabel: "Contact support",
            onClick: this.toggleState("modalActive")
          }}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState("modalActive")}
        title="Contact support"
        primaryAction={{
          content: "Send",
          onAction: this.toggleState("modalActive")
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const theme = {
      colors: {
        topBar: {
          background: "#357997"
        }
      },
      logo: {
        width: 124,
        topBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg",
        contextualSaveBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg",
        url: "https://youbb.us",
        accessibilityLabel: "YouBB"
      }
    };

    return (
      <div style={{ height: "500px" }}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState("showMobileNavigation")}
          >
            {loadingMarkup}
            {isLoading ? loadingPageMarkup : loadingPage}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  toggleState = (key, value) => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
      switch (value) {
        case "header":
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.header
          });
          break;
        case "paypal":
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.hidePaypalCart
          });
          break;
        case "shopify":
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.hideShopifyPoweredBy
          });
          break;
        default:
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.header
          });
          break;
      }
    };
  };

  handleSearchFieldChange = value => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: ""
      };
    });
  };

  handleSubjectChange = supportSubject => {
    this.setState({ supportSubject });
  };

  handleMessageChange = supportMessage => {
    this.setState({ supportMessage });
  };
}

export default App;
