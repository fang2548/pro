
    // รายชื่อผู้ใช้งาน
    const users = [
      { username: "admin", password: "1234" },
      { username: "user1", password: "5678" }
    ];

    function login() {
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const errorDiv = document.getElementById("loginError");

      const found = users.find(u => u.username === user && u.password === pass);
      if (found) {
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("searchSection").classList.remove("hidden");
      } else {
        errorDiv.textContent = "❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      }
    }

    function logout() {
      document.getElementById("loginSection").classList.remove("hidden");
      document.getElementById("searchSection").classList.add("hidden");
      document.getElementById("caseInput").value = "";
      document.getElementById("result").innerHTML = "";
      document.getElementById("loginError").textContent = "";
    }

    async function searchCase() {
      const caseNumber = document.getElementById("caseInput").value.trim();
      const resultDiv = document.getElementById("result");

      if (!caseNumber) {
        resultDiv.innerHTML = "⚠️ กรุณากรอกเลขคดี";
        return;
      }

      const url = `https://script.google.com/macros/s/AKfycbymZijiCtY_O5u-IH66IDnmD3UlcA2eQcjgoCeymL9hdM0VEYjaiqsa1dCQvNun2ZeWGA/exec?case=${caseNumber}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          resultDiv.innerHTML = "❌ ไม่พบข้อมูลของเลขคดีนี้";
        } else {
          resultDiv.innerHTML = `
            <p><strong>เลขคดี:</strong> ${data["เลขที่คดี"]}</p>
            <p><strong>ชื่อผู้ยื่น:</strong> ${data["ชื่อผู้ยื่น"]}</p>
            <p><strong>สถานะ:</strong> ${data["สถานะ"]}</p>
          `;
        }
      } catch (err) {
        resultDiv.innerHTML = "❌ เกิดข้อผิดพลาดในการเชื่อมต่อ";
      }
    }
  