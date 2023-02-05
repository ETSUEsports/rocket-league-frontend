<template>
  <div class="scoreboard_active" id="main_container">
    <div class="text-center" id="score_container">
      <!-- Start Left Team -->
      <div class="team_card" id="blue_team">
        <div class="left_score_img"></div>
        <div class="left_score_card">
          <h1
            id="left_team_score"
            class="white_text"
            style="font-size: 5em"
          ></h1>
        </div>
        <div class="left_team_name">
          <h1
            id="left_team_name"
            class="white_text"
            style="font-size: 5em"
          ></h1>
        </div>
        <div class="left_team_wins">
          <div id="left_win_1" class="win_light win_hide"></div>
          <div id="left_win_2" class="win_light win_hide"></div>
          <div id="left_win_3" class="win_light win_hide"></div>
          <div id="left_win_4" class="win_light win_hide"></div>
        </div>
        <div class="left_player_list">
          <b id="left_player_list" class="white_text"></b>
        </div>
      </div>
      <!-- End Left Team -->
      <!-- Start Game Clock -->
      <div id="game_clock">
        <h1 id="time_seconds" style="font-size: 5em"></h1>
        <div id="below_clock">
          <b>Game <span id="game_id">...</span></b> - Best of
          <span id="best_of_count">3</span>
        </div>
      </div>
      <!-- End Game Clock -->
      <!-- Start Right Team  -->
      <div class="team_card" id="orange_team">
        <div class="right_score_img"></div>
        <div class="right_score_card">
          <h1
            id="right_team_score"
            class="black_text"
            style="font-size: 5em"
          ></h1>
        </div>
        <div class="right_team_name">
          <h1
            id="right_team_name"
            class="white_text"
            style="font-size: 5em"
          ></h1>
        </div>
        <div class="right_team_wins">
          <div id="right_win_1" class="win_light win_hide"></div>
          <div id="right_win_2" class="win_light win_hide"></div>
          <div id="right_win_3" class="win_light win_hide"></div>
          <div id="right_win_4" class="win_light win_hide"></div>
        </div>
        <div class="right_player_list">
          <b id="right_player_list" class="black_text"></b>
        </div>
      </div>
      <!-- End Right Team -->
    </div>
    <!-- Start Left Players -->
    <div id="left_players_container" class="left">
      <div
        data-player="player_1"
        id="team_0_player_1"
        class="player_boost_bar top"
      >
        <h3 class="left_text" id="team_0_player_1_name">Player 1</h3>
        <div class="boost_number boost_top_left">
          <h4 class="boost_tag text-center" id="team_0_player_1_boost">100</h4>
        </div>
        <div class="boost_bar">
          <div class="boost_bar_fill" id="team_0_player_1_boost_bar"></div>
        </div>
      </div>
      <div
        data-player="player_1"
        id="team_0_player_1_events"
        class="top events"
       
      >
        <i id="team_0_player_1_events_icon_1"></i>
        <i id="team_0_player_1_events_icon_2"></i>
      </div>
      <div
        data-player="player_2"
        id="team_0_player_2"
        class="player_boost_bar middle"
      >
        <h3 class="left_text" id="team_0_player_2_name">Player 2</h3>
        <div class="boost_number boost_middle_left">
          <h4 class="boost_tag text-center" id="team_0_player_2_boost">100</h4>
        </div>
        <div class="boost_bar">
          <div class="boost_bar_fill" id="team_0_player_2_boost_bar"></div>
        </div>
      </div>
      <div
        data-player="player_2"
        id="team_0_player_2_events"
        class="middle events"
       
      >
        <i id="team_0_player_2_events_icon_1"></i>
        <i id="team_0_player_2_events_icon_2"></i>
      </div>
      <div
        data-player="player_3"
        id="team_0_player_3"
        class="player_boost_bar bottom"
      >
        <h3 class="left_text" id="team_0_player_3_name">Player 3</h3>
        <div class="boost_number boost_bottom_left">
          <h4 class="boost_tag text-center" id="team_0_player_3_boost">100</h4>
        </div>
        <div class="boost_bar">
          <div class="boost_bar_fill" id="team_0_player_3_boost_bar"></div>
        </div>
      </div>
      <div
        data-player="player_3"
        id="team_0_player_3_events"
        class="bottom events"
       
      >
        <i id="team_0_player_3_events_icon_1"></i>
        <i id="team_0_player_3_events_icon_2"></i>
      </div>
    </div>
    <!-- End Left Players -->
    <!-- Start Right Players -->
    <div id="right_players_container" class="right">
      <div
        data-player="player_4"
        id="team_1_player_1"
        class="player_boost_bar top_right"
      >
        <h3 class="right_text" id="team_1_player_1_name">Player 1</h3>
        <div class="boost_number">
          <h4
            class="boost_tag boost_tag_right text-center"
            id="team_1_player_1_boost"
          >
            100
          </h4>
        </div>
        <div class="boost_bar boost_bar_right">
          <div
            class="boost_bar_fill boost_bar_fill_right"
            id="team_1_player_1_boost_bar"
          ></div>
        </div>
      </div>
      <div
        data-player="player_4"
        id="team_1_player_1_events"
        class="top events"
       
      >
        <i id="team_1_player_1_events_icon_1"></i>
        <i id="team_1_player_1_events_icon_2"></i>
      </div>
      <div
        data-player="player_5"
        id="team_1_player_2"
        class="player_boost_bar middle_right"
      >
        <h3 class="right_text" id="team_1_player_2_name">Player 2</h3>
        <div class="boost_number">
          <h4
            class="boost_tag boost_tag_right text-center"
            id="team_1_player_2_boost"
          >
            100
          </h4>
        </div>
        <div class="boost_bar boost_bar_right">
          <div
            class="boost_bar_fill boost_bar_fill_right"
            id="team_1_player_2_boost_bar"
          ></div>
        </div>
      </div>
      <div
        data-player="player_5"
        id="team_1_player_2_events"
        class="middle events"
       
      >
        <i id="team_1_player_2_events_icon_1"></i>
        <i id="team_1_player_2_events_icon_2"></i>
      </div>
      <div
        data-player="player_6"
        id="team_1_player_3"
        class="player_boost_bar bottom_right"
      >
        <h3 class="right_text" id="team_1_player_3_name">Player 3</h3>
        <div class="boost_number">
          <h4
            class="boost_tag boost_tag_right text-center"
            id="team_1_player_3_boost"
          >
            100
          </h4>
        </div>
        <div class="boost_bar boost_bar_right">
          <div
            class="boost_bar_fill boost_bar_fill_right"
            id="team_1_player_3_boost_bar"
          ></div>
        </div>
      </div>
      <div
        data-player="player_6"
        id="team_1_player_3_events"
        class="bottom events"
       
      >
        <i id="team_1_player_3_events_icon_1"></i>
        <i id="team_1_player_3_events_icon_2"></i>
      </div>
    </div>
    <!-- End Right Players -->
    <!-- Start Player Stats -->
    <div id="player_stats_container">
      <!-- Start Player Stats Accent Bar -->
      <div id="player_stats_accent_bar">
        <span class="player_stats_name_text" id="player_stats_name"
          >Player Name</span
        >
      </div>
      <!-- End Player Stats Accent Bar -->
      <div class="container">
        <div class="row text-center">
          <div class="col-2">
            <span class="player_stats_large_text" id="player_stats_goals"
              >Goals</span
            >
            <div class="clear"></div>
            <span class="player_stats_small_text">Goals</span>
          </div>
          <div class="col-2">
            <span class="player_stats_large_text" id="player_stats_shots"
              >Shots</span
            >
            <div class="clear"></div>
            <span class="player_stats_small_text">Shots</span>
          </div>
          <div class="col-2">
            <span class="player_stats_large_text" id="player_stats_asst"
              >Asst</span
            >
            <div class="clear"></div>
            <span class="player_stats_small_text">Assists</span>
          </div>
          <div class="col-2 col-md-offset-1">
            <span class="player_stats_large_text" id="player_stats_saves"
              >Saves</span
            >
            <div class="clear"></div>
            <span class="player_stats_small_text">Saves</span>
          </div>
        </div>
      </div>
    </div>
    <!-- End Player Stats -->
    <!-- Start Boost Circle -->
    <div id="boost_circle">
      <div id="gauge3" class="gauge-container three blue"></div>
    </div>
    <!-- End Boost Circle-->
    <!-- Start Replay Stats -->
    <div id="replay_stats_container">
      <div id="replay_stats_team_container">
        <span class="replay_stats_large_text" id="replay_stats_team"></span>
      </div>
      <div id="replay_stats_name_container">
        <i class="replay_stats_icon_goal"></i>
        <span class="icon_text" id="replay_stats_name"></span>
      </div>
      <div id="replay_stats_asst_container">
        <i class="replay_stats_icon_asst"></i>
        <span class="icon_text" id="replay_stats_asst"></span>
      </div>
    </div>
    <!-- End Replay Stats -->
  </div>
  <!-- Start Ads -->
  <div
    id="ads_container"
    style="visibility: visible; display: block !important"
  >
    <div id="ads_tn_outline">
      <div id="ads_loop">
        <ul id="ads_list"></ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTheme } from "vuetify";

export default defineComponent({
  name: "OverlayView",
  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () => (theme.global.name.value = "overlay"),
    };
  },
  mounted() {
    this.toggleTheme();
  },
  data() {
    return {
      //
    };
  },
});
</script>
<style scoped>

#ads_container{
    background-image: url("../img/RL_ADs.png");
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 0px;
    left: 0px;
}

.ads_hidden {
    visibility: hidden !important;
}

#ads_loop{
    width: 270px;
    height: 75px;
    overflow: hidden;
    position: absolute;
    bottom: 60px;
    left: 165px;
}

img.ads {
    width: 270px;
    height: 75px;
}

#ads_list{
    position: relative;
    list-style: none;
    height: 100%;
    width: 10000%;
    padding: 0;
    margin: 0;
    /*transition: all 750ms ease;*/
    left: 0;
}

.ads_item {
    position: relative;
    height: 100%;
    float: left;
}

#boost_circle{
    position: absolute;
    bottom: 41px;
    left: 1600px;
}

.gauge-container {
    width: 250px;
    height: 250px;
    display: block;
    float: left;
    padding: 10px;
    background-color: rgba(33,48,67,1);
    margin: 7px;
    border-radius: 50%;
    position: relative;
    z-index: 99;
}

.gauge-container>.label {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    background: rgba(0, 0, 0, 0.5);
    font-family: monospace;
    font-size: 0.8em;
    padding: 5px 10px;
}

.gauge-container>.gauge .dial {
    stroke: #334455;
    stroke-width: 2;
    fill: rgba(0, 0, 0, 0);
}

.gauge-container>.gauge .value {
    stroke: #2fe3ff;
    stroke-width: 2;
    fill: rgba(0, 0, 0, 0);
}

.gauge-container.three>.gauge .dial {
    stroke: #334455;
    stroke-width: 5;
}

.gauge-container.three.blue>.gauge .value {
    stroke: var(--rl-primary-blue);
    stroke-width: 8;
}
.gauge-container.three.orange>.gauge .value {
    stroke: var(--rl-primary-orange);
    stroke-width: 8;
}
.gauge-container.three>.gauge .value-text {
    fill: #ffffff;
    font-family: Fyrste;
    font-size: 50px;
}


:root {
    --etsu-primary-navy: #041E42;
    --etsu-primary-gold: #FFC72C;
    --rl-primary-blue: #1873FF;
    --rl-primary-orange: #F48D2E;
    font-variant-numeric: tabular-nums;
}

@font-face {
    font-family: Fyrste;
    src: url("../fonts/fyrste.ttf") format("truetype");
}

.white_text {
    color: #ffffff !important;
}

.black_text {
    color: #000000 !important;
}

#main_container {
    width: 1920px;
    height: 1080px;
    position: relative;
}

.replay_active {
    background-image: url("../img/Replay.png") !important;
    background-repeat: no-repeat !important;
}

#transition_img {
    position: absolute;
    z-index: 1000;
}

.scoreboard_active {
    /*background-image: url("../img/Artboard\ 1.png");*/
    background-repeat: no-repeat;
}

/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

/* Modal Header */
.modal-header {
    padding: 2px 16px;
    background-color: #ff0033;
    color: white;
}

/* Modal Body */
.modal-body {
    padding: 2px 16px;
}

/* Modal Footer */
.modal-footer {
    padding: 2px 16px;
    background-color: #ff0033;
    color: white;
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: animatetop;
    animation-duration: 0.4s
}


#player_stats_container{
    width: 550px;
    height: 85px;
    position: absolute;
    bottom: 48px;
    left: 1185px;
    font-family: Fyrste;
    text-transform: lowercase;
}
#player_stats_accent_bar{
    width: 550px;
    height: 40px;
    position: absolute;
    bottom: 85px;
    left: 0px;
    z-index: 1;
}
#player_stats_container.left_team_stats{
    background-color: rgba(33,48,67,0.8);
    color: #ffffff;
}
#player_stats_accent_bar.left_team_stats{
    background-color: rgba(24,115,255,0.8);
}
#player_stats_container.right_team_stats{
    background-color: rgba(33,48,67,0.8);
    color: #ffffff;
}
#player_stats_accent_bar.right_team_stats{
    background-color: rgba(244, 141, 46, 0.8);
}
span.player_stats_name_text{
    font-size: 40px;
    z-index: 99;
    font-family: Fyrste;
    color: #ffffff;
    text-transform: lowercase;
    margin-left: 20px !important;
    line-height: 35px;
}
span.player_stats_large_text{
    font-size: 50px;
    line-height: 45px;
    margin-bottom: -5px;
}
span.player_stats_small_text{
    font-size: 25px;
    margin-top: -5px;
}
.clear{
    clear:both;
}
.stat{
    display: inline-block;
}
#left_players_container{
    width: 300px;
    height: 133px;
    position: absolute;
    top: 13px;
    font-family: Fyrste;
    text-transform: lowercase;
}
#right_players_container{
    width: 300px;
    height: 133px;
    position: absolute;
    top: 13px;
    left: 1620px;
    font-family: Fyrste;
    text-transform: lowercase;
}
.boost_number{
    width: 44px;
    height: 44px;
    position: absolute;
    margin-bottom: 4px;
    top: 0px;
}
.boost_tag{
    line-height: 30px;
    padding-right: 10px;
}
.boost_tag_right{
    line-height: 30px;
    padding-left: 20px;
}


#team_0_player_1,#team_0_player_2,#team_0_player_3{
    /*background: linear-gradient(90deg, rgba(33,48,67,0.7) 0%, rgba(24,115,255,0.8) 100%);*/
    background-color: rgba(33,48,67,0.8);
    clip-path: polygon(0 0, 98% 0, 100% 100%, 0% 100%);

}
#team_1_player_1,#team_1_player_2,#team_1_player_3{
    /*background: linear-gradient(270deg, rgba(33,48,67,0.7) 0%, rgba(244,141,46,0.8) 100%);*/
    background-color: rgba(33,48,67,0.8);
    clip-path: polygon(2% 0, 100% 0, 100% 100%, 0% 100%);
}
.player_boost_bar{
    width: 300px;
    height: 44px;
    margin-bottom: 4px;
    color: #ffffff;
}
.boost_bar{
    background-color: rgb(255,255,255,0.2);
    width: 100%;
}
.boost_bar_right{
    float: right;
}
#team_0_player_1_boost_bar,#team_0_player_2_boost_bar,#team_0_player_3_boost_bar.boost_bar_fill{
    background-color: rgba(24,115,255,1);
    position: relative;
    bottom: 4px;
    height: 10px;
    width: 10%;
    transition: all 0.2s cubic-bezier(.03,.56,1,.39);
    clip-path: polygon(0 0, 98% 0, 100% 100%, 0% 100%);
}
#team_1_player_1_boost_bar,#team_1_player_2_boost_bar,#team_1_player_3_boost_bar.boost_bar_fill{
    background-color: rgba(244,141,46,1);
    position: relative;
    bottom: 4px;
    height: 10px;
    width: 10%;
    transition: all 0.2s cubic-bezier(.03,.56,1,.39);
    clip-path: polygon(2% 0, 100% 0, 100% 100%, 0% 100%);
}
.boost_bar_fill_right{
    float: right;
}
.middle{
    width: 310px;
}
.bottom{
    width: 320px;
}
.middle_right{
    position: relative;
    right: 10px;
    width: 310px;
}
.bottom_right{
    position: relative;
    right: 20px;
    width: 320px;
}
.boost_top_left{
    position: absolute;
    left: 256px;
}
.boost_middle_left{
    position: absolute;
    top: 48px;
    left: 266px;
}
.boost_bottom_left{
    position: absolute;
    top: 96px;
    left: 276px;
}
.left{
    text-align: left !important;
}
h3.left_text{
    margin-left: 20px !important;
    line-height: 30px;
}
.right{
    text-align: right !important;
}
h3.right_text{
    margin-right: 20px !important;
    line-height: 30px;
}

.player_focused_left{
    background: none !important;
    background-color: rgb(17, 72, 153) !important;
}
.player_focused_right{
    background: none !important;
    background-color: rgb(165, 90, 19) !important;
}
.events_focused_left{
    background: none !important;
    background-color: rgb(17, 72, 153) !important;
}
.events_focused_right{
    background: none !important;
    background-color: rgb(165, 90, 19) !important;
}

#team_0_player_1_events{
    width: 55px;
    height: 44px;
    margin-bottom: 4px;
    position: absolute;
    top: 0px;
    left: 293.9px;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 10.9% 100%);
}
#team_0_player_2_events{
    width: 55px;
    height: 44px;
    margin-bottom: 4px;
    position: absolute;
    top: 48px;
    left: 303.8px;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 11.2% 100%);
}
#team_0_player_3_events{
    width: 55px;
    height: 44px;
    margin-bottom: 4px;
    position: absolute;
    top: 96px;
    left: 313.5px;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 11.4% 100%);
}


#team_1_player_1_events{
    width: 55px;
    height: 44px;
    margin-bottom: 4px;
    position: absolute;
    top: 0px;
    right: 294px;
    clip-path: polygon(8% 0, 100% 0, 89.2% 100%, 0% 100%);
}
#team_1_player_2_events{
    width: 55px;
    height: 44px;
    margin-bottom: 4px;
    position: absolute;
    top: 48px;
    right: 303.9px;
    clip-path: polygon(8% 0, 100% 0, 89.3% 100%, 0% 100%);
}
#team_1_player_3_events{
    width: 55px;
    height: 44px;
    margin-bottom: 4px;
    position: absolute;
    top: 96px;
    right: 313.6px;
    clip-path: polygon(8% 0, 100% 0, 88.5% 100%, 0% 100%);
}

#team_0_player_1_events_icon_1,#team_0_player_2_events_icon_1,#team_0_player_3_events_icon_1{
    top: 2px;
    left: 10px;
    position: absolute;
    height: 40px;
    width: 40px;
}
#team_0_player_1_events_icon_2,#team_0_player_2_events_icon_2,#team_0_player_3_events_icon_2{
    top: 2px;
    left: 50px;
    position: absolute;
    height: 40px;
    width: 40px;
}

#team_1_player_1_events_icon_1,#team_1_player_2_events_icon_1,#team_1_player_3_events_icon_1{
    top: 2px;
    left: 10px;
    position: absolute;
    height: 40px;
    width: 40px;
}
#team_1_player_1_events_icon_2,#team_1_player_2_events_icon_2,#team_1_player_3_events_icon_2{
    top: 2px;
    left: 50px;
    position: absolute;
    height: 40px;
    width: 40px;
}

.icon_shot{
    background-image: url(../img/SHOT_ICON.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.icon_save{
    background-image: url(../img/SAVE_ICON.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.icon_demo{
    background-image: url(../img/DEMO_ICON.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.active_events{
    background-color: rgba(33,48,67,0.8);
}

#replay_stats_container{
    width: 1040px;
    height: 75px;
    position: absolute;
    bottom: 40px;
    left: 440px;
    font-family: Fyrste;
    text-transform: lowercase;
    background-color: rgba(33,48,67,0.8);
    color: #ffffff;
}
span.replay_stats_large_text{
    font-size: 50px;
    margin-left: 20px !important;
    line-height: 70px;
}
span.icon_text{
    font-size: 50px;
    margin-left: 20px !important;
    line-height: 70px;
    left: 50px;
    position: relative;
}
#replay_stats_team_container{
    position: absolute;
}
#replay_stats_name_container{
    position: absolute;
    left: 300px;
}
#replay_stats_asst_container{
    position: absolute;
    left: 700px;
}
span.replay_stats_small_text{
    font-size: 25px;
    padding: 5px 0;
    margin-left: 0px !important;
}
.replay_stats_icon_goal{
    background-image: url(../img/GOAL_ICON.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 64px;
    width: 64px;
    top: 5.5px;
    display: inline;
    position: absolute;
}
.replay_stats_icon_asst{
    background-image: url(../img/ASST_ICON.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 64px;
    width: 64px;
    top: 5.5px;
    display: inline;
    position:absolute;
}


#score_container{
    width: 1920px;
    height: 123px;
    font-family: Fyrste;
}
#below_clock{
    margin-top: -24px !important;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
}
.win_light{
    background-color: #ffffff;
    width: 30px;
    height: 8px;
}
#left_win_2{
    position: relative;
    right: 40px;
    top: -8px;
}
#left_win_3{
    position: relative;
    right: 80px;
    top: -16px;
}
#left_win_4{
    position: relative;
    right: 120px;
    top: -24px;
}
.team_card{
    width: 382px;
    height: 110px;
    color: #ffffff;
    background-color: rgba(33,48,67,0.5);
}
#blue_team{
    position: absolute;
    top: 13px;
    left: 469px;
    clip-path: polygon(0% 0, 100% 0, 100% 100%, 6% 100%);
}
#orange_team{
    position: absolute;
    top: 13px;
    left: 1069px;
    clip-path: polygon(0% 0, 100% 0, 94% 100%, 0% 100%);
}
#game_clock{
    width: 220px;
    height: 110px;
    background-color: rgba(33,48,67,0.8);
    position: absolute;
    top: 13px;
    left: 850px;
    color: #ffffff;
}
#time_seconds{
    position: relative;
    bottom: 7px;
}
.left_score_card{
    width: 100px;
    height: 110px;
    background-color: var(--etsu-primary-navy);
    color: #ffffff;
    position: relative;
    left: 282px;
}
.left_team_wins{
    width: 100px;
    height: 110px;
    position: absolute;
    left: 230px;
    top: 65px;
}
.right_team_wins{
    width: 100px;
    height: 110px;
    position: absolute;
    left: 125px;
    top: 65px;
}
.win_hide{
    background-color: rgba(255,255,255, 0.3);
}
#right_win_2{
    position: relative;
    right: -40px;
    top: -8px;
}
#right_win_3{
    position: relative;
    right: -80px;
    top: -16px;
}
#right_win_4{
    position: relative;
    right: -120px;
    top: -24px;
}
#right_win_4.bo3{
    visibility: hidden;
}
#left_win_4.bo3{
    visibility: hidden;
}
.right_score_img{
    width: 282px;
    height: 86px;
    background-image: url(../img/RL_TeamCard.png);
    background-size: cover;
    position: absolute;
    left: 100px;
}
.left_score_img{
    width: 282px;
    height: 86px;
    background-image: url(../img/RL_Left_TeamCard.png);
    background-size: cover;
    position: absolute;
}
.left_team_name{
    height: 110px;
    color: #ffffff;
    position: absolute;
    font-size: 10px;
    right: 120px;
    top: 0px;
    text-align: right !important;
}
.right_team_name{
    height: 110px;
    color: #ffffff;
    position: absolute;
    font-size: 10px;
    left: 120px;
    top: 0px;
    text-align: right !important;
}
#left_team_score{
    position: relative;
    bottom: 7px;
}
#right_team_score{
    position: relative;
    bottom: 7px;
}
.left_player_list{
    width: 382px;
    height: 24px;
    background-color: var(--etsu-primary-navy);
    position: relative;
    text-align: right !important;
    top: -24px;
}
.right_score_card{
    width: 100px;
    height: 110px;
    background-color: var(--etsu-primary-gold);
    color: #000000;
    position: relative;
}
.right_player_list{
    width: 382px;
    height: 24px;
    background-color: var(--etsu-primary-gold);
    position: relative;
    color: #000000;
    text-align: left !important;
    top: -24px;
}
b#left_player_list{
    padding-right: 10px;
    font-family: Arial, Helvetica, sans-serif;
}
b#right_player_list{
    padding-left: 10px;
    font-family: Arial, Helvetica, sans-serif;
}



#game_clock.game_over{
    visibility: hidden;
}
#left_players_container.game_over{
    visibility: hidden;
}
#right_players_container.game_over{
    visibility: hidden;
}
#blue_team.game_over{
    left: 569px;
}
#orange_team.game_over{
    left: 949px;
}

</style>
