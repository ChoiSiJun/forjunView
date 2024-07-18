import styled from 'styled-components';
import Button from '@mui/material/Button';


const headerNavData = [
    {
        title: "자료검색",
        url: "#dataSearch",
    },
    {
        title: "전자정보원",
        url: "#eleInformation",
    },
    {
        title: "연구학습지원",
        url: "#learningSupport",
    },
    {
        title: "도서관서비스",
        url: "#service",
    },
    {
        title: "도서관안내",
        url: "#introGuide",
    },
    {
        title: "커뮤니티",
        url: "#community",
    }    
];

const headerSiteMapData = [
    {
        title: "로그인",
        url: "#login",
    },
    {
        title: "미르대학교",
        url: "#uni",
    },
    {
        title: "sitemap",
        url: "#sitemap",
    }
];

const MyButton = styled(Button)({

    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
  

const HeaderTopList = () =>{
    return(
        <div>
            <MyButton>나는버튼</MyButton>
        <ul>
           {
            headerSiteMapData.map((map) => (
                <li key={map.title}>
                    <a href={map.url}>{map.title}</a>
                </li>
            ))
           }
        </ul>
        </div>
    )

}


const HeaderBottomList = ()=>{
    return(
        <ul className="header_bottom_list">
            {
                headerNavData.map((nav) => (
                <li key={nav.title}>
                    <a href={nav.url}>{nav.title}</a>
                </li>
                ))
            }
        </ul>
    )
}

const Header = () =>{
    return(
        <header id="header">
           <div className="header_top">
                <h1><a href="/">logo</a></h1>
                <HeaderTopList/>
           </div>
           <div className="header_bottom">
                <HeaderBottomList/>
                <div><span>B</span></div>
           </div>
        </header>
    )
}







export default Header;