// travel.js
$(document).ready(function () {
  const destinations = [
    { name: "神の子池", type: "山", days: "２泊３日以上", seasons: ["夏", "秋"], image: "../img/kamikoike1.jpg", url: "eria1.html"},
    { name: "立山黒部・雪の大谷", type: "山", days: "２泊３日以上", seasons: ["春"], image: "../img/yukinoootani1.jpg", url: "eria2.html" },
    { name: "清津峡", type: "どちらでもない", days: "２泊３日以上", seasons: ["春", "夏", "秋","冬"], image: "../img/kiyotukyou1.jpg" , url: "eria3.html"},
    { name: "龍宮窟", type: "海", days: "１泊２日", seasons: ["春", "夏", "秋","冬"], image: "../img/shimoda1.jpg", url: "eria4.html" },
    { name: "七里ヶ浜 由比ヶ浜 ・報国寺", type: "海", days: "日帰り", seasons: ["春", "夏", "秋","冬"], image: "../img/kamakura1.jpg" , url: "eria5.html"},
    { name: "国営ひたち海浜公園・袋田の滝", type: "どちらでもない", days: "日帰り", seasons: ["春", "夏", "秋","冬"], image: "../img/ibaraki.jpeg", url: "ibaraki.html" },
    { name: "弘前公園", type: "どちらでもない", days: "１泊２日", seasons: ["春","秋","冬"], image: "../img/1200px-Hirosaki_castle.jpg", url: "aomori.html" },
    { name: "蔵王の樹氷", type: "山", days: "２泊３日以上", seasons: ["冬"], image: "../img/zaou.webp" , url: "yamagata.html"},
    { name: "鋸山", type: "山", days: "日帰り", seasons: ["春", "夏", "秋","冬"], image: "../img/iwa.jpg" , url: "chiba.html"},
    { name: "奥入瀬渓流", type: "山", days: "２泊３日以上", seasons: ["春", "夏", "秋","冬"], image: "../img/okuirise2.jpg" , url: "aomori.html"},
    { name: "河津七滝", type: "山", days: "１泊２日", seasons: ["秋"], image: "../img/kawazu1.jpeg" , url: "kawazu.html"},
    { name: "沖縄", type: "海", days: "２泊３日以上", seasons: ["春", "夏", "秋","冬"], image: "../img/okinawa1.jpeg" , url: "okinawa.html"},
    { name: "上高地", type: "山", days: "１泊２日", seasons: ["秋","冬"], image: "../img/kamikouti1.jpeg" , url: "kamikouti.html"},
    { name: "越後湯沢", type: "山", days: "１泊２日", seasons: ["冬"], image: "../img/etigo1.jpeg" , url: "etigo.html"},
    { name: "芦ノ湖", type: "山", days: "１泊２日", seasons: ["秋"], image: "../img/asinoko1.jpeg", url: "asinoko.html" },
    { name: "夕日の塔", type: "どちらでもない", days: "日帰り", seasons: ["春", "秋"], image: "../img/夕日の塔.jpg" , url: "shiokaze.html"},
    { name: "奥日光", type: "山", days: "１泊２日", seasons: ["秋"], image: "../img/山.jpg", url: "nikkou.html" },
    { name: "大福寺", type: "山", days: "１泊２日", seasons: ["春", "秋"], image: "../img/寺.jpg" , url: "daihukuzi.html"},
    { name: "富士五湖周辺の秘境スポット", type: "山", days: "１泊２日", seasons: ["春", "夏", "秋"], image: "../img/湖１.jpeg", url: "huzi.html" },
    { name: "白馬マウンテンバー", type: "山", days: "１泊２日", seasons: ["春"], image: "../img/山１.jpeg", url: "hakuba.html"}
  ];

  let userAnswers = {};

  // トップ画像クリックで質問1へ（ここで一度だけ登録する）
  $("#start-image").on("click", function () {
    $("#top").hide();
    $("#q1").show();
  });

  // 回答ボタンの処理（親要素は closest で取得）
  $(".answer").on("click", function () {
    const questionBlock = $(this).closest(".question");
    const parentId = questionBlock.attr("id");

    // data-days の値を destinations の表記と揃える（必要に応じて調整）
    const rawDays = $(this).data("days");
    let normalizedDays = rawDays;
    if (rawDays === "5泊6日") normalizedDays = "２泊３日以上"; // 例: 長期をまとめる

    if (parentId === "q1") {
      userAnswers.days = normalizedDays;
      $("#q1").hide();
      $("#q2").show();
      return;
    }

    if (parentId === "q2") {
      userAnswers.season = $(this).data("season");
      $("#q2").hide();
      $("#q3").show();
      return;
    }

    if (parentId === "q3") {
      userAnswers.type = $(this).data("type");
      $("#q3").hide();

      const matches = destinations.filter(dest =>
        dest.days === userAnswers.days &&
        dest.type === userAnswers.type &&
        dest.seasons.includes(userAnswers.season)
      );

     if (matches.length > 0) {
  const html = matches.map(m => `
    <div class="rec-item">
      <h3 class="rec-title">${m.name}</h3>
      <img class="rec-image" src="${m.image}" alt="${m.name}" style="max-width:100%;border-radius:8px;">
      <div class="rec-actions" style="margin-top:8px;">
        <a class="detail-button" href="${m.url}" target="_blank" rel="noopener noreferrer">詳しく見る</a>
      </div>
    </div>
  `).join("");
  $("#recommendation").html(html);
} else {
  $("#recommendation").text("条件に合う旅行先が見つかりませんでした。");
}


      $("#result").show();
      return;
    }
  });
});