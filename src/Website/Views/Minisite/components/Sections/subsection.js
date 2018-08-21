import React from "react";

export default class NestedDropdown extends React.Component {
  static displayName = "NestedDropdown";

  static shape = {
    id: Prop.Type.string.isRequired,
    message: Prop.Type.node.isRequired,
    link: Prop.Type.string,
    options: Prop.Type.arrayOf(Prop.Type.shape(NestedDropdown.shape))
  };

  static propTypes = {
    openDirection: Prop.Type.enumOf(["left", "right"]),
    displayText: Prop.Type.node.isRequired,
    hasCaret: Prop.Type.bool,
    options: Prop.Type.arrayOf(Prop.Type.shape(NestedDropdown.shape).isRequired)
      .isRequired
  };

  static defaultProps = {
    hasCaret: true,
    openDirection: "left"
  };

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      selectedIds: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.options !== nextProps.options ||
      this.state.showDropdown !== nextState.showDropdown ||
      this.state.selectedIds !== nextState.selectedIds
    );
  }

  handleDropdownToggle = () => {
    let nextState = !this.state.showDropdown;

    this.setState({
      showDropdown: nextState,
      selectedIds: []
    });
  };

  handleDropdownClose = () => {
    this.setState({
      showDropdown: false,
      selectedIds: []
    });
  };

  handleSelectedId = (selected, depthLevel) => {
    return () => {
      const updatedArray = this.state.selectedIds.slice(0);

      updatedArray[depthLevel] = selected;

      this.setState({
        selectedIds: updatedArray
      });
    };
  };

  renderDisplay() {
    const classes = classNames({
        dropdown__display: true, //eslint-disable-line quote-props
        "dropdown__display--with-caret": this.props.hasCaret
      }),
      caret = (
        <Icon
          classes={["dropdown__display-caret"]}
          glyph={iconChevronDown}
          size={"small"}
        />
      );

    return (
      <div className={classes}>
        {this.props.displayText}
        {this.props.hasCaret ? caret : null}
      </div>
    );
  }
  renderSubMenu(options, depthLevel = 0) {
    if (this.state.showDropdown !== true) {
      return null;
    }
    const classes = ["dropdown__options"];
    classes.push(`dropdown__options--${this.props.openDirection}-align`);

    const menuOptions = options.map(option => {
      const display = option.link ? (
          <a href={option.link}>{option.message}</a>
        ) : (
          <span>{option.message}</span>
        ),
        hasOptions = option.options && option.options.length > 0;

      let subMenu;
      // only render selected submenu and only if nested options exist
      if (this.state.selectedIds[depthLevel] === option.id && hasOptions) {
        const newDepthLevel = depthLevel + 1;

        subMenu = this.renderSubMenu(option.options, newDepthLevel);
      }

      return (
        <li
          key={option.id}
          onMouseEnter={this.handleSelectedId(option.id, depthLevel)}
        >
          {display}
          {subMenu}
        </li>
      );
    });

    return (
      <div className={classNames.apply(null, classes)}>
        <ul>{menuOptions}</ul>
      </div>
    );
  }

  render() {
    return (
      <div
        className="dropdown dropdown--nested"
        onClick={this.handleDropdownToggle}
      >
        {this.renderDisplay()}
        {this.renderSubMenu(this.props.options)}
      </div>
    );
  }
}

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import ReactDOM from "react-dom";
// import "../../minisite.css";
// import {
//   Col,
//   Row,
//   Container,
//   Card,
//   CardHeader,
//   CardBody,
//   ListGroup,
//   ListGroupItem,
//   TabContent,
//   TabPane,
//   CardTitle,
//   CardText
// } from "reactstrap";
// import { UncontrolledCollapse, Button } from "reactstrap";
// import classnames from "classnames";
// import { Link } from "react-router-dom";
// import { MAIN_URL } from "../../config/MINISITE_API";

// class Menu extends Component {
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       activeTab: 0
//     };
//   }

//   toggle(tab) {
//     if (tab !== 0) {
//       var element = document.getElementById("0");
//       element.className = element.className.replace(/\bactive\b/g, "");
//     }
//     if (this.state.activeTab !== tab) {
//       this.setState({
//         activeTab: tab
//       });
//       var element = document.getElementById(tab);
//       element.className = element.className.replace("", "active");
//     }
//   }

//   render() {
//     //console.log("active tab : "+this.state.activeTab);
//     var activeTab = this.state.activeTab;
//     return (
//       <div
//         className="minisite_content__wrapper"
//         style={{
//           paddingTop: "60px"
//         }}
//       >
//         <Container
//           className="mb-4"
//           style={{
//             marginTop: "20px"
//           }}
//         >
//           <div>
//             {!this.props.menus.foodCategories.length ? (
//               "No Food Group"
//             ) : (
//                 <div>
//                   {this.props.menus.foodCategories.map((fg, i) => (
//                     <div key={fg.foodCategoryID}>
//                       {!this.props.menus.foodCategories[i].foods.length ? (
//                         ""
//                       ) : (
//                           <ListGroupItem
//                             id={i}
//                             key={fg.foodCategoryID}
//                             onClick={() => {
//                               this.toggle(i);
//                             }}
//                             className={
//                               i === 0
//                                 ? " active "
//                                 : classnames({ active: activeTab === i })
//                             }
//                           >
//                             {fg.name}
//                             <span
//                               className={
//                                 activeTab === i
//                                   ? "fa fa-caret-down"
//                                   : "fa fa-caret-right"
//                               }
//                               style={{ float: "right", fontSize: "20px" }}
//                             />
//                           </ListGroupItem>
//                         )}

//                       <TabContent activeTab={this.state.activeTab}>
//                         <TabPane
//                           tabId={this.state.activeTab}
//                           style={{
//                             display: activeTab === i ? "inline" : "none"
//                           }}
//                         >
//                           {this.props.menus.foodCategories[i].foods.map(
//                             fgitem => (
//                               <Col sm="12" className="mb-3" key={fgitem.foodID}>
//                                 <p>
//                                   {fgitem.name} ................................{" "}
//                                   <span style={{ float: "right" }}>
//                                     {" "}
//                                     Rs. {fgitem.price}
//                                   </span>
//                                 </p>
//                               </Col>
//                             )
//                           )}
//                         </TabPane>
//                       </TabContent>
//                     </div>
//                   ))}
//                 </div>
//               )}
//           </div>
//         </Container>
//       </div>
//     );
//   }
// }

// export default connect(
//   ({
//     MinisiteContainer: {
//       crud: { logo, slug, menus }
//     },
//     auth: { cookies }
//   }) => ({
//     cookies,
//     logo,
//     slug,
//     menus
//   })
// )(Menu);
