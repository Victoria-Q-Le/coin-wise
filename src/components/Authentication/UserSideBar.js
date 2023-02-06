import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, styled } from '@mui/material';

export default function UserSideBar({user}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const ContainerDiv = styled("div")({
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace"
  })

  const pictureStyle = {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#eebc1d",
    objectFit: "contain"
  }

  const profileStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "90%"
  }


  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar 
                onClick={toggleDrawer(anchor,true)}
                style={{
                  height: 38,
                  width: 38,
                  cursor: "pointer",
                  backgroundColor: "#eecb1d"
                }}
                src={user.photoURL}
                alt={user.displayName || user.email}
            />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
           <ContainerDiv>
            <div style={profileStyle}>
              <Avatar 
                style={pictureStyle}
                src={user.photoURL}
                alt={user.displayName || user.email}
              />
              <span style={{width: "100%", fontSize: 25, textAlign: "center", fontWeight: "bolder", wordWrap: "break-word"}}>
                {user.displayName || user.email}
              </span>
            </div>
           </ContainerDiv>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
