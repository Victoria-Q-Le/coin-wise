import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button, styled } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth,db } from '../../config/firebase';
import { CoinState } from '../../CoinContext';
import {numberWithCommas} from  '../Carousel'
import {AiFillDelete} from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {watchlist, coins, user, symbol, setAlert } = CoinState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid)
    try {
      await setDoc(coinRef, {coins: watchlist.filter((wish) => wish !== coin?.id)}, {merge: true})
      setAlert({open: true, message: `${coin.name} has been removed from watchlist`, type: 'success'})
    } catch (error) {
      setAlert({open: true, message: error.message, type: 'error'})
    }
  }

  const logout = () => {
    signOut(auth)
    toggleDrawer()
  }

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
  
  const logoutButton = {
    height: "8%",
    width: "100%",
    backgroundColor: "#eebc1d",
    marginTop: 20
  }

  const watchList = {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15, 
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:12,
    overflowY: "scroll"
  }

  const watchlistCoin = {
    padding: 10,
    borderRadius: 5, 
    color: "black",
    width: "100%",
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eebc1d",
    boxShadow: "0 0 3px black"
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
              <span style={{width: "100%", fontSize: 25, textAlign: "center", fontWeight: "bolder", wordWrap: "break-word", paddingBottom: 10}}>
                {user.displayName || user.email}
              </span>
            </div>
            {/* END OF AVATAR STYLING */}

            <div style={watchList}>
              <span style={{fontSize: 15, textShadow: "0 0 5px black"}}>
                Watch List
              </span>
              {coins.map((coin) => {
                if (watchlist.includes(coin?.id)){
                  return (
                    <div style={watchlistCoin} >
                      <span>{coin?.name}</span>
                      <span style={{display: "flex", gap: 8}}> {symbol} {numberWithCommas(coin?.current_price.toFixed(2))} </span>
                      <AiFillDelete style={{cursor: "pointer"}} fontSize="16" onClick={() => removeFromWatchlist(coin)} />
                    </div>
                  )
                }
              })}

            </div>

            <Button
              variant='contained'
              style={logoutButton}
              onClick={logout}
            >
              Log Out
            </Button>
            {/* SIGN OUT BUTTON */}
           </ContainerDiv>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
