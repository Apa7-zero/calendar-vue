import axios from "axios";

export default {
  loading: null,
  http(data, $this) {
    if (!data.noLoad) {
      this.loading = $this.$loading({
        text: "加载中"
      });
    }

    axios({
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
      method: "post",
      url: data.url,
      data: data.data
    }).then(response => {
      let res = response.data;

      if (res.code !== 0) {
        if (this.loading !== null) this.loading.close();
        if (data.error) {
          data.error(res);
        } else {
          $this.$message.error(res.msg);
        }
      } else {
        if (data.continueLogin || data.noLoad) {
          data.ok(res.data);
        } else {
          if (this.loading !== null) this.loading.close();
          data.ok(res.data);
        }
      }
    });
  }
};
