const template = document.createElement("template");
template.innerHTML = `
    <div class="overlayContainer">
    <section class="overlayContent">  
      <slot class="name" name="title"></slot>
      <slot class="price" name="price"></slot>
      <div class="overlayBody">
        <ul class="overlayList">
          <li>Бүх төрлийн аниме үзэх эрх</li>
          <li>Худалдан авалт хийх эрх</li>
          <li>Хэрэглэгчийн буланд нэгдэх</li>
          <li>Мэдээлэл цаг алдалгүй авах</li>
        </ul>
        <article>
          <img src="https://i.ibb.co/JFq7zKh/qrTest.png"  class="qrCode" alt="" />
        </article>
      </div>
      <article class="transactionDesc">
        5926252543 Б.Өнөбаатар хаан банк дансанд гүйлгээний утга дээр
        нэвтрэх нэрээ оруулан шилжүүлснээр эрх баталгаажна.
      </article>
    </section>
    </div>
    <style>
    .overlayContainer {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        align-items: center;
        background-color: rgba(0,0,0,0.5);
        & .overlayContent {
          background-color: #00171f;
          height: 480px;
          width: 60%;
          border-radius: 8px;
          & .name {
            color: white;
          }
          & .price {
            color: white;
            text-align: center;
            margin-bottom: 8px;
            font-size: 20px;
          }
        }
      }

      .overlayBody {
        display: flex;
        justify-content: space-around;
        align-items: center;
        & .qrCode {
          object-fit: contain;
          width: 200px;
        }
        & .overlayList {
          font-size: 20px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          & li {
            margin: 8px 0px;
            list-style: none;
          }
        }
      }

      .transactionDesc {
        font-size: 18px;
        color: white;
        margin: 0px 64px;
        margin-top: 24px !important;
        padding: 16px;
        border: 2px solid #6d6b6b;
        border-radius: 7px;
      }

      @media (max-width: 600px) {
        .overlayContent {
          width: 80% !important;
          height: 560px !important;
          & .price{
            font-size: 16px !important;
          }
          & .name {
            font-size: 20px;
            color: white;
          }
          & .overlayBody {
            & .overlayList {
              display: none;
            }
          }
          & .transactionDesc {
            font-size: 16px;
          }
        }
      }
    
    </style>
    `;

class ServiceInfo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("service-info", ServiceInfo);
