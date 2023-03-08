<template>
    <div class="outline">
        <div class="toprow">
            <slot name="toprow"></slot>
        </div>
        <div>
            <slot name="main"></slot>
        </div>
    </div>
</template>

<style lang="scss">
.outline {
    border: 1px solid var(--etsu-primary-gold);

    &.gold {
        border: 1px solid var(--etsu-primary-gold);
    }

    &.orange {
        border: 1px solid var(--rl-primary-orange);
    }

    &.blue {
        border: 1px solid var(--rl-primary-blue);
    }

    border-radius: 4px;
    padding: 4px;
    margin: 10px;
}

.toprow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 4px;

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }

}

input,
label {
  display: block;
  margin-left: 5px;
}

input {
  width: calc(100% - 20px);
}

input[type="text"],
input[type="number"] {
  border: 1px solid var(--db-secondary-bg);
  padding: 8px;
  background-color: var(--etsu-secondary-bg);
  color: #ffffff;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  width: calc(100% - 20px);
  box-sizing: border-box;
}

label {
  text-align: left;
  font-size: 2.5vh;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}

.button {
  &.success {
    background-color: #4CAF50;
    /* Green */
  }

  &.danger {
    background-color: #f44336;
    /* Red */
  }

  &.warning {
    background-color: #ff9800;
    /* Orange */
  }

  &.info {
    background-color: #2196F3;
    /* Blue */
  }

  &.default {
    background-color: #e7e7e7;
    /* Gray */
    color: black;
  }

  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2.5vh;
  border-radius: 4px;
  margin-right: 5px;
}

.button:hover {
  opacity: 0.8;
  outline: 2px solid var(--etsu-primary-gold);
}
</style>
