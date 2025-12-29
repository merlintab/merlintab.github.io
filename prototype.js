      const apps = [];
      const appsDiv = document.getElementById("apps");
      const appContainer = document.getElementById("appContainer");
      const frame = document.getElementById("appFrame");

      function updateTime() {
        const d = new Date();
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        document.getElementById("time").textContent = h + ":" + m;
      }

      setInterval(updateTime, 1000);
      updateTime();

      function renderApps() {
        appsDiv.innerHTML = "";
        apps.forEach(app => {
          const div = document.createElement("div");
          div.className = "app";
          div.textContent = app.name;
          div.onclick = () => openApp(app.html);
          appsDiv.appendChild(div);
        });
      }

      function openApp(html) {
        frame.srcdoc = html;
        appContainer.style.display = "flex";
      }

      function closeApp() {
        frame.srcdoc = "";
        appContainer.style.display = "none";
      }

      function closeInstaller() {
        document.getElementById("installer").style.display = "none";
      }

      document.getElementById("installBtn").onclick = () => {
        document.getElementById("installer").style.display = "flex";
      };

      document.getElementById("closeInstaller").onclick = closeInstaller;

      document.getElementById("homeBtn").onclick = closeApp;

      document.getElementById("confirmInstall").onclick = () => {
        const input = document.getElementById("installInput").value.trim();

        const nameMatch = input.match(/<installable\s+appname="([^"]+)">/i);
        const contentMatch = input.match(
          /<installable[\s\S]*?>([\s\S]*?)<\/installable>/i
        );

        if (!nameMatch || !contentMatch) {
          return;
        }

        apps.push({
          name: nameMatch[1],
          html: contentMatch[1].trim()
        });

        document.getElementById("installInput").value = "";
        closeInstaller();
        renderApps();
      };

      apps.push({
        name: "YouTube.com",
        html:
          "<iframe src='https://www.youtube.com' style='border:none;width:100%;height:100%'></iframe>"
      });

      renderApps();
