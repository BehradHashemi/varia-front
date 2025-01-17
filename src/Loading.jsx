import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 24px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  main,
  aside {
    height: 100%;
    margin: 5px;
    border-radius: inherit;
  }
  main {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    section {
      width: 100%;
      height: 170px;
      border-radius: inherit;
      background: linear-gradient(
        90deg,
        #eeeeee 0%,
        #eeeeee 35%,
        #dddddd 45%,
        #dddddd 55%,
        #eeeeee 65%,
        #eeeeee 100%
      );
      background-size: 400%;
      animation: loading 1.5s infinite;
    }
  }
  aside {
    background: linear-gradient(
      90deg,
      #eeeeee 0%,
      #eeeeee 35%,
      #dddddd 45%,
      #dddddd 55%,
      #eeeeee 65%,
      #eeeeee 100%
    );
    background-size: 400%;
    animation: loading 1.5s infinite;
    width: 30%;
  }
  @keyframes loading {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
  @media (width <= 768px) {
    flex-direction: column;
    // padding: 0px;
    main,
    aside {
        width: 100%; 
    }
    aside {
        height: 50px;
    }
    main {
        height: 100%;
        section {
            margin:10px
        }
    }
`;

function Loading() {
  return (
    <Div>
      <aside></aside>
      <main>
        <section></section>
        <section></section>
        <section></section>
      </main>
    </Div>
  );
}

export default Loading;
