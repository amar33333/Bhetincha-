import React from "react";
import { Route, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
let routes = {};

const findRouteName = url => routes[url];

const findDynamicRouteName = url => {
  const dynamicRoutes = Object.keys(routes).filter(
    route => route.indexOf(":x") !== -1
  );
  if (!dynamicRoutes.length) return undefined;

  let x = "";
  let found = true;

  for (let i = 0; i < dynamicRoutes.length; i++) {
    x = "";
    found = true;
    const dynamicRoute = dynamicRoutes[i];
    const dynamicRouteItemList = dynamicRoute.split("/");
    const dynamicUrlItemList = url.split("/");
    if (dynamicRouteItemList.length !== dynamicUrlItemList.length) {
      found = false;
    } else {
      for (let j = 0; j < dynamicRouteItemList.length; j++) {
        const item = dynamicRouteItemList[j];
        if (!(item === ":x" || item === dynamicUrlItemList[j])) {
          found = false;
        } else {
          if (item === ":x") {
            x = routes[dynamicRoute].startsWith("X")
              ? routes[dynamicRoute].slice(1)
              : dynamicUrlItemList[j];
          }
        }
      }
    }
    if (found) {
      if (dynamicRouteItemList[dynamicRouteItemList.length - 1] === ":x") {
        break;
      } else {
        x = routes[dynamicRoute];
        break;
      }
    }
  }

  if (found) {
    return x;
  }
};

const getPaths = pathname => {
  const paths = ["/"];

  if (pathname === "/") return paths;

  pathname.split("/").reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const BreadcrumbsItem = ({ match, ...rest }) => {
  if (match.url === "/") return null;

  const routeName = findRouteName(match.url);
  if (routeName) {
    return match.isExact ? (
      <BreadcrumbItem active>{routeName}</BreadcrumbItem>
    ) : (
      <BreadcrumbItem>
        <Link to={match.url || ""}>{routeName}</Link>
      </BreadcrumbItem>
    );
  } else {
    const dynamicRouteName = findDynamicRouteName(match.url);
    if (dynamicRouteName) {
      return match.isExact ? (
        <BreadcrumbItem active>{dynamicRouteName}</BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <Link to={match.url || ""}>{dynamicRouteName}</Link>
        </BreadcrumbItem>
      );
    }
  }
  return null;
};

const Breadcrumbs = ({ location: { pathname }, match, ...rest }) => {
  const paths = getPaths(pathname);
  const items = paths.map((path, i) => (
    <Route key={i++} path={path} component={BreadcrumbsItem} />
  ));
  return <Breadcrumb>{items}</Breadcrumb>;
};

export default props => {
  routes = props.routes;
  return (
    <div>
      <Route path="/:path" component={Breadcrumbs} />
    </div>
  );
};
