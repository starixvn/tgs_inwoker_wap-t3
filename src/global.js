import { createGlobalStyle } from "styled-components";
import i18n from "./utils/i18n";
import "./assets/fonts/notosans/notosans-sc/css.css";
import "./assets/fonts/notosans/notosans-tc/css.css";

const languageSwitcher = (language) => {
  switch (language) {
    case "en-US":
      return `Montserrat`;
    case "zh-CN":
      return `'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'`;
    case "zh-TW":
      return `'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'`;
    case "th-TH":
      return ``;
    default:
      return `Montserrat`;
  }
};
export const GlobalStyles = createGlobalStyle`


@font-face {
  font-family: 'Montserrat';
  src: URL(${
    process.env.PUBLIC_URL + "/assets/font/montserrat.ttf"
  }) format('truetype');
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');



  * {
    font-family: ${languageSwitcher(i18n.language)};
  
  }
  
  body {
    background: ${({ theme }) => theme.body};
    background-size: 100%;
  }

  .headerSubmenu .slick-track,
  .headerSubmenu .slick-slider .slick-list {
    height: auto;
  }
  
  .headerSubmenu .slick-slide > div {
    display: flex;
    align-items: center;
  }
  
  .headerSubmenu .slick-prev {
    left: 0;
    top: 90px;
  }
  
  .headerSubmenu .slick-next {
    right: 0;
    top: 90px;
  }
  .headerSubmenu.slick-slider .slick-track,
  .headerSubmenu.slick-slider .slick-list {
    margin-left: 25px;
    margin-right: 35px;
  }
  
  .headerSubmenu .slick-prev::before,
  .headerSubmenu .slick-next::before {
    color: ${({ theme }) => theme.primary};
  }

      
  .headerSubmenu .slick-prev::before,
  .headerSubmenu .slick-next::before {
    content: ur(${
      process.env.PUBLIC_URL + "/assets/images/pcHomePage/left.png"
    });
  }
  
  .headerSubmenu .slick-prev::before,
  .headerSubmenu .slick-next::before {
    color: ${({ theme }) => theme.accent};
  }

  .MuiTypography-root,
  .MuiBottomNavigationAction-label,
  .MuiInputBase-input{
   font-family: ${languageSwitcher(i18n.language)};
  }


  @media only screen and (max-width: 768px) {
    .MuiPickersModal-dialogRoot{
      transform: scale(1.5);
    }

  }


  


  


`;
