<template>
  <div class="main">
    <div class="container">
      <div class="timeslots-col" v-for="column in columns">
        <div
          class="timeslot-container"
          v-for="(item, index) in column"
          v-bind:class="setStatus(item)"
        >
          <h2>{{item.time_slot}}</h2>
          <p>{{item.account_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";

export default {
  name: "TimeSlots",
  props: {
    timeSlots: Array
  },
  data: function() {
    return {
      cols: 2
    };
  },
  methods: {
    setStatus: function(property) {
      return {
        "slot-unknown": property.account_name === "AVAILABLE",
        "slot-known": property.account_name !== "AVAILABLE"
      };
    },
    updateTimeSlot(e) {
      // console.log("This is  a data" + this.timeSlots)
      // this.timeSlots.push(e/)
      for (var i in this.timeSlots) {
        // console.log(i);
        // this.$props.timeSdlots[i] = "sdf";

        if (this.$props.timeSlots[i].time_slot === e.time_slot) {
          // console.log('helo hi hi')
          this.$props.timeSlots[i] = e;
        }
        console.log(this.$props.timeSlots);
        this.$forceUpdate();

        // this.computed.columns()
      }

      // this.timeSlots.forEach((item, i) => {
      //   console.log(item)
      //   // console.log('this is i: '+  this.time_slot[i])
      //   item.time_slot[i] = e

      //   if (item.time_slot === e.time_slot) {
      //     this.timeSlots[i] = e;
      //   }
      // });
      // this.timeSlots.push(e);
    }
  },
  created: function() {
    EventBus.$on("update-time-slot", data => {
      // this.$props.timeSlots = 'hello world'
      this.updateTimeSlot(data);
      console.log("this is new timeslot" + data.time_slot);
    });
  },
  computed: {
    columns() {
      let columns = [];
      let mid = Math.ceil(this.$props.timeSlots.length / this.cols);
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.$props.timeSlots.slice(col * mid, col * mid + mid));
      }
      // console.log(columns)
      return columns;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}
.slot-unknown {
  background-color: whitesmoke;
}
.slot-known {
  background-color: #abbbdb;
}
.timeslots {
  display: grid;
  height: 200px;
  width: 500px;
  grid-auto-rows: 100px;
  grid-template-columns: 20px 20px;
}
.timeslots-col {
  margin: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.timeslot-container {
  /* background-color: rgba(255, 255, 255, 0.8); */
  border: 1px solid;
  padding: 5px;
  margin: 5px;
  text-align: center;
}
</style>
