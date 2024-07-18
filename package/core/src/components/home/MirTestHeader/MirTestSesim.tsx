import styled, { css } from 'styled-components';

import * as React from 'react';





const HeaderWrap = styled.header`
  width:100%; height:110px;  
  margin:0px;
  border-bottom:1px solid #cccccc;
`;

const ContentWrap = styled.div`
  width:100%;  
  margin:0px;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:${(props) => props.display? props.display:"space-between"};
  background: ${(props) => props.color? props.color:"white"};
`;

const HeaderLogo = styled.h1`
  img{
    width:180px;
  }
`;

const MenuLists = styled.ul`
  display:flex;
  flex-wrap:wrap;
  list-style: none;
  margin: 0; padding: 0;
    @media screen and (max-width: 1200px) {
      display:none;
    }
`;
const MenuListItem = styled.li`
  display: inline-block;
  height: 60px;
  a {
    display: block;
    position: relative;
    height: 60px;
    line-height: 65px;
    font-size: 1rem;
    font-weight: 500;
    padding: 0 0px;
    margin: 0 16px;
    text-decoration: none;
  }
  .active {
  }
`;
const HeaderMenuBtn = styled.button`
  border:0px;
  position:relative;
  width:50px; height:50px;
  background-color:blue;
  border-radius:6px;
  cursor:pointer;
    span{
      width:70%; height:3px; 
      background-color:#ffffff;
      position:absolute;
      left:50%; transform:translateX(-50%);
      }
    span:nth-child(1){top:10px;}  
    span:nth-child(2){top:calc(50% - 1.5px);}  
    span:nth-child(3){bottom:10px;}  
`;
const SiteMapLists = styled.ul`
  display:flex;
  flex-wrap:wrap;
  list-style: none;
  margin: 0; padding: 0;
    @media screen and (max-width: 768px) {
    }
`;

const headerTypeA = () =>{
  const SiteListData = [
    { title: "로그인", url: "#login"},
    { title: "미르대학교", url: "#uni"},
    { title: "sitemap", url: "#sitemap"}
];  
  const MenuListData =[
    { title: "자료검색", url: "#dataSearch"},
    { title: "전자정보원", url: "#eleInformation"},
    { title: "연구학습지원", url: "#learningSupport"},
    { title: "도서관서비스",  url: "#service"},
    { title: "도서관안내", url: "#introGuide"},
    { title: "커뮤니티", url: "#community"}    
];
  return(
    <HeaderWrap>
      <ContentWrap display="end">
        <SiteMapLists>
            {SiteListData.map((item)=>{
                return(
                  <MenuListItem key={item.title}> <a href={item.url}>{item.title}</a> </MenuListItem>
                )
              })}
          </SiteMapLists>
      </ContentWrap>      
      <ContentWrap color="pink">
          <HeaderLogo>Logo</HeaderLogo>          
          <MenuLists>
            {MenuListData.map((item)=>{
                return(
                  <MenuListItem key={item.title}> <a href={item.url}>{item.title}</a> </MenuListItem>
                )
              })}
          </MenuLists>
          <HeaderMenuBtn > <span/><span/><span/> </HeaderMenuBtn >
      </ContentWrap>
    </HeaderWrap>
  )
}

export default headerTypeA;