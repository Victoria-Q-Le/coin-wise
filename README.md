# COIN WISE

The site is live at [Coin Wise](https://coin-wise.netlify.app/).

## What is it? 

- This app is a full stack app using React and MUI for front end, and Firebase at backend server. The app features many useful dependencies to help user gather information regarding their interested crypto currencies such as the market cap, price and price fluctuation in selected time frame. Coin information was obtained from [CoinGecko API](https://www.coingecko.com/)
- Please use below credential to have the full experience of the app. 
    user name: test@gmail.com
    password: 123456



### Home Page 

The Home page contains 2 main sections: 
- Banner: with an autoplay carousel that display 10 most popular crypto currencies including their prices, symbol as well as their changes in the past 24 hours. 
- Coin table: provides information for 100 different crypto currencies. Also comes with a search box so user can easily look up for any currency the want. 

### Coin page

Once click on any currency, users will be directed to the coin page of that specific coin. In this page users can find useful insights regarding the coin such as:
- Coin information 
- Chart that reflects the price changes of that coin during selected time frame 

### Challenges 

- This app was created using React 18 and MUI 5 was used to style the app. MUI 5 is the only version that sully supports React 18, but it also comes with some major changes when campared to previous version. Some of the biggest changes in v5 is the replacement of JSS for Emotion and the deprecation of useStyle. By default v5 uses Emotion as a styling engine, however I also used styled from mui/material/styles to customize the components that I used in this app. More can be learn [here](https://mui.com/material-ui/guides/interoperability/#change-the-default-styled-engine)
- The second challenge I faced when built this app is that the chart didn't show on my coin page after I set up the datasets and other required props. I ran into an error says one of the props is not registered. Luckily was able to find the solution for my error [here](https://www.youtube.com/watch?v=RF57yDglDfE)
- Firebase 9.17.0 was used to build the backend but after carefully followed the instruction, the error "Module not found, default condition should be the last one". However, after researching I decided to roll back my firebase version from 9.17.0 to 9.16.0 and fixed the issue. Click [here](https://github.com/firebase/firebase-js-sdk/issues/7005) to learn more

### Dependecies and Credits 

- [MUI](https://mui.com/)
- [React Router Dom](https://reactrouter.com/en/main/start/overview). Useful tutorial [here](https://www.youtube.com/watch?v=Ul3y1LXxzdU&t=2037s)
- [axios](https://www.npmjs.com/package/axios)
- [chartjs2](https://react-chartjs-2.js.org/)