import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import {
  UPDATE_COREMEMBER_PENDING,
  UPDATE_COREMEMBER_FULLFILLED,
  UPDATE_COREMEMBER_REJECTED,
  DELETE_COREMEMBER_PENDING,
  DELETE_COREMEMBER_FULLFILLED,
  DELETE_COREMEMBER_REJECTED,
  CREATE_COREMEMBER_PENDING,
  CREATE_COREMEMBER_FULLFILLED,
  CREATE_COREMEMBER_REJECTED,
  FETCH_COREMEMBER_PENDING,
  FETCH_COREMEMBER_FULLFILLED_NODATA,
  FETCH_COREMEMBER_REJECTED,
  FETCH_COREMEMBER_FULLFILLED_WITHDATA,
  CREATE_MEMBER_PENDING,
  CREATE_MEMBER_FULLFILLED,
  CREATE_MEMBER_REJECTED,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_FULLFILLED,
  DELETE_MEMBER_REJECTED,
  UPDATE_MEMBER_PENDING,
  UPDATE_MEMBER_FULLFILLED,
  UPDATE_MEMBER_REJECTED,
  CREATE_SOCIALLINK_PENDING,
  CREATE_SOCIALLINK_FULLFILLED,
  CREATE_SOCIALLINK_REJECTED,
  UPDATE_SOCIALLINK_PENDING,
  UPDATE_SOCIALLINK_FULLFILLED,
  UPDATE_SOCIALLINK_REJECTED,
  DELETE_SOCIALLINK_PENDING,
  DELETE_SOCIALLINK_FULLFILLED,
  DELETE_SOCIALLINK_REJECTED
} from "./types";
import {
  OnCoreMemberPost,
  OnCoreMemberPut,
  OnCoreMemberDelete,
  OnCoreMemberGetList,
  OnMemberPost,
  OnMemberDelete,
  OnMemberUpdate,
  OnSocialLinkPost,
  OnSocialLinkDelete,
  onSocialLinkPut
} from "../../Business/config/businessServerCall";
const epics = [];

//Delete SOCIAL LINK By Id
export const OnSocialLinkDel = payload => {
  console.log("value on call" + payload);
  return {
    type: DELETE_SOCIALLINK_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_SOCIALLINK_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const id = payload.body.id;
    const link_id = payload.body.link_id;
    console.log(id + " id for delete is ");
    return OnSocialLinkDelete({
      id,
      access_token,
      businessId,
      link_id
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("social link Deleted Successfully");
          return [
            {
              type: DELETE_SOCIALLINK_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Deleting social link");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: DELETE_SOCIALLINK_REJECTED
        });
      });
  })
);

//Add social link to memeber
export const onAddSocialLink = payload => {
  console.log("value on call" + payload);
  return {
    type: CREATE_SOCIALLINK_PENDING,
    payload
  };
};
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_SOCIALLINK_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const { body } = payload;
    const id = payload.id;
    console.log("access_tokent=" + access_token);
    console.log("businessId" + businessId);
    console.log("member id" + id);

    console.log("payload data to be sent" + { body });
    return OnSocialLinkPost({
      id,
      body,
      access_token,
      businessId
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social link Added Successfully");
          return [
            {
              type: CREATE_SOCIALLINK_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Creating  social link" + response);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_SOCIALLINK_REJECTED
        });
      });
  })
);

//update social link of specific  memeber
export const onUpdateSocialLink = payload => {
  console.log("value on call update social link" + payload);
  return {
    type: UPDATE_SOCIALLINK_PENDING,
    payload
  };
};
epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_SOCIALLINK_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const { body } = payload;
    const id = payload.id;
    const link_id = payload.link_id;
    console.log("access_tokent=" + access_token);
    console.log("businessId" + businessId);
    console.log("member id" + id);
    console.log("link id" + link_id);

    console.log("payload data to be sent" + { body });
    return onSocialLinkPut({
      id,
      body,
      access_token,
      businessId,
      link_id
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social link updated Successfully");
          return [
            {
              type: UPDATE_SOCIALLINK_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error updating  social link" + response);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: UPDATE_SOCIALLINK_REJECTED
        });
      });
  })
);

//update Memeber of core member
export const OnMemberedit = payload => {
  console.log("value on call OnMemberedit/update" + payload.id);
  return {
    type: UPDATE_MEMBER_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_MEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const id = payload.id;
    const body = payload.body;
    console.log(id + " id for update is ");
    return OnMemberUpdate({
      body,
      access_token,
      businessId,
      id
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Member Updated Successfully", { autoClose: 500 });
          return [
            {
              type: UPDATE_MEMBER_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Updating member");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: UPDATE_MEMBER_REJECTED
        });
      });
  })
);

//Delete memeber By Id
export const OnMemberDel = payload => {
  console.log("value on call" + payload);
  return {
    type: DELETE_MEMBER_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_MEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const id = payload;
    console.log(id + " id for delete is ");
    return OnMemberDelete({
      access_token,
      businessId,
      id
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Member Deleted Successfully");
          return [
            {
              type: DELETE_MEMBER_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Deleting Core member");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: DELETE_MEMBER_REJECTED
        });
      });
  })
);
//Add Memebers
export const OnMemberAdd = payload => {
  console.log("value on call" + payload);
  return {
    type: CREATE_MEMBER_PENDING,
    payload
  };
};
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_MEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const { body } = payload;
    console.log("access_tokent=" + access_token);
    console.log("businessId" + businessId);

    console.log("payload data to be sent" + { body });
    return OnMemberPost({
      body,
      access_token,
      businessId
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Member Added Successfully");
          return [
            {
              type: CREATE_MEMBER_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Creating  member" + response);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_MEMBER_REJECTED
        });
      });
  })
);
//Get core memeber along with all memebers  info
export const OnCoreMemberGet = payload => {
  return {
    type: FETCH_COREMEMBER_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_COREMEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    return OnCoreMemberGetList({
      access_token,
      businessId
    })
      .concatMap(({ response }) => {
        const name = response.name;

        if (name !== "") {
          return [
            {
              type: FETCH_COREMEMBER_FULLFILLED_WITHDATA,
              payload: response
            }
          ];
        }
        if (name === "") {
          // toast.success("No data availabel");

          return [
            {
              type: FETCH_COREMEMBER_FULLFILLED_NODATA,
              payload: response
            }
          ];
        } else {
          throw new Error(" Core member fetching error " + response.name);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_COREMEMBER_REJECTED
        });
      });
  })
);
export const OnCoreMemberAddEdit = payload => {
  console.log("value on call" + payload);
  return {
    type: CREATE_COREMEMBER_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_COREMEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const { body } = payload;
    console.log("payload data to be sent" + { body });
    return OnCoreMemberPost({
      body,
      access_token,
      businessId
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("core Member Added Successfully");
          return [
            {
              type: CREATE_COREMEMBER_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Creating Core member");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_COREMEMBER_REJECTED
        });
      });
  })
);
export const OnCoreMemberUpdate = payload => {
  console.log("value on call" + payload);
  return {
    type: UPDATE_COREMEMBER_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_COREMEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    const { body } = payload;
    console.log("payload data to be sent" + { body });
    return OnCoreMemberPut({
      body,
      access_token,
      businessId
    })
      .concatMap(({ response }) => {
        console.log("corre memeber" + response);
        if (response.msg === "success") {
          toast.success("core Member updated Successfully");
          return [
            {
              type: UPDATE_COREMEMBER_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING
            }
          ];
        } else {
          throw new Error("Error Updating Core member");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: UPDATE_COREMEMBER_REJECTED
        });
      });
  })
);
export const OnCoreMemberDel = payload => {
  console.log("value on call" + payload);
  return {
    type: DELETE_COREMEMBER_PENDING,
    payload
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_COREMEMBER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const businessId = getState().auth.cookies.user_data.business_id;
    return OnCoreMemberDelete({
      access_token,
      businessId
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("core Member Deleted Successfully");
          return [
            {
              type: DELETE_COREMEMBER_FULLFILLED
            },
            {
              type: FETCH_COREMEMBER_PENDING,
              payload: {
                access_token,
                businessId
              }
            }
          ];
        } else {
          throw new Error("Error Deleting Core member");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: DELETE_COREMEMBER_REJECTED
        });
      });
  })
);

export default epics;
