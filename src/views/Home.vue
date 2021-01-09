<template>
  <FullCalendar
    locale="zh-cn"
    defaultView="dayGridMonth"
    style="width:100%"
    :events="monthData"
    weekNumberCalculation="ISO"
    :buttonText="buttonText"
    id="full_calendar"
    ref="fullCalendar"
    @eventClick="eventClick"
    :custom-buttons="customButtons"
    :header="{
      right: 'prev,next',
      center: 'title',
      left: ''
    }"
    :plugins="calendarPlugins"
  />
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";

let self;
export default {
  name: "Home",
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
      monthData: [],
      buttonText: {
        today: "今天",
        month: "月",
        week: "周",
        day: "天"
      },
      customButtons: {
        next: {
          text: "PREV",
          click: () => {
            let calendarApi = this.$refs.fullCalendar.getApi();
            calendarApi.next();
            this.yearMonth = calendarApi.view.title
              .replace(/年/g, "-")
              .replace(/月/g, "");
            this.yearMonth =
              this.yearMonth.split("-")[1] > 9
                ? this.yearMonth
                : this.yearMonth.split("-")[0] +
                  "-0" +
                  this.yearMonth.split("-")[1];
            this.getData(this.yearMonth);
          }
        },
        prev: {
          text: "PREV",
          click: () => {
            let calendarApi = this.$refs.fullCalendar.getApi();
            calendarApi.prev();
            this.yearMonth = calendarApi.view.title
              .replace(/年/g, "-")
              .replace(/月/g, "");
            this.yearMonth =
              this.yearMonth.split("-")[1] > 9
                ? this.yearMonth
                : this.yearMonth.split("-")[0] +
                  "-0" +
                  this.yearMonth.split("-")[1];
            this.getData(this.yearMonth);
          }
        }
      }
    };
  },
  mounted() {
    self = this;

    let yearMonth = this.$refs.fullCalendar
      .getApi()
      .view.title.replace(/年/g, "-")
      .replace(/月/g, "");
    yearMonth =
      yearMonth.split("-")[1] > 9
        ? yearMonth
        : yearMonth.split("-")[0] + "-0" + yearMonth.split("-")[1];
    this.getData(yearMonth);
  },
  methods: {
    getData(yearMonth) {
      this.$tool.http(
        {
          url: this.$url.calendar,
          data: { month: yearMonth },
          ok(data) {
            self.monthData = [];
            for (let i in data) {
              self.monthData.push({
                title:
                  "农历" +
                  data[i].lunar_month +
                  "，" +
                  (data[i].is_working === 1 ? "工作日" : "休息日"),
                start:
                  data[i].day < 10
                    ? yearMonth + "-0" + data[i].day
                    : yearMonth + "-" + data[i].day,
                end:
                  data[i].day < 10
                    ? yearMonth + "-0" + data[i].day
                    : yearMonth + "-" + data[i].day,
                textColor: "#fff",
                backgroundColor: "#5FB878",
                borderColor: "#5FB878"
              });
            }

            console.log(self.monthData);
            self.$refs.fullCalendar.getApi().rerenderEvents();
          }
        },
        this
      );
    },
    eventClick() {}
  }
};
</script>
<style>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";

.fc-scroller {
  overflow: visible !important;
}
.fc-unthemed td.fc-today {
  background-color: #fff;
}
</style>
