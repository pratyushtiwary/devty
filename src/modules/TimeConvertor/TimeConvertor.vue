<script setup lang="ts">
import moment from "moment-timezone";
import TimeConvertor, { type DateObj, convertTimezone, getDateObj, availableTimezones, renderDate } from ".";
import Input from "@/components/InputComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, watchEffect } from "vue";


const format = 'Y-m-d H:i';
const timezone = ref(moment.tz.guess());
const toTimezone = ref(timezone.value);
let time = ref(new Date());
const unix = ref(time.value.getTime());
const timeStr = ref(renderDate(time.value, format));
const output = ref(TimeConvertor(getDateObj(time.value), timezone.value));
const conversionOutput = ref(convertTimezone(output.value.iso, timezone.value, toTimezone.value));
watchEffect(() => {
    if (time.value || timezone.value) {
        timeStr.value = renderDate(time.value, format);
        output.value = TimeConvertor(getDateObj(time.value), timezone.value);
        unix.value = time.value.getTime();
    }
});

watchEffect(() => {
    if (timezone.value || toTimezone.value) {
        conversionOutput.value = convertTimezone(output.value.iso, timezone.value, toTimezone.value);
    }
});

function handleChange(newVal: string) {
    time.value = new Date();
    time.value.setTime(parseInt(newVal));
}

function handleDateChange(newVal: string) {
    time.value = new Date(newVal);
}
</script>

<template>
    <div class="container">
        <div class="input">
            <Input label="Unix Time" type="number" class="fullWidth" :value="unix"
                @update:value="useThrottle($event, handleChange, 500)" />
            <ui-divider>OR</ui-divider>
            <ui-datepicker class="fullWidth" outlined label="Select Date" :config="{ enableTime: true, dateFormat: format }"
                v-model="timeStr" @update:modelValue="handleDateChange"></ui-datepicker>
            <ui-autocomplete class="fullWidth timezone" highlight outlined v-model="timezone" filterKeywords
                label="Timezone" helper-text-id="timezone-helper" :source="availableTimezones"></ui-autocomplete>
            <ui-textfield-helper visible class="helper" id="timezone-helper">^ Start typing to see
                suggestions</ui-textfield-helper>
            <fieldset class="to-timezone">
                <legend>To Timezone</legend>
                <ui-autocomplete class="fullWidth timezone" highlight outlined v-model="toTimezone" filterKeywords
                    label="Timezone" helper-text-id="timezone-helper" :source="availableTimezones"></ui-autocomplete>
                <ui-textfield-helper visible class="helper" id="timezone-helper">^ Start typing to see
                    suggestions</ui-textfield-helper>
                <Input label="Local" class="fullWidth outputInput" :value="conversionOutput.local" disabled
                    :allowCopy="true" />
                <Input label="ISO" class="fullWidth outputInput" :value="conversionOutput.iso" disabled :allowCopy="true" />
            </fieldset>
        </div>
        <div class="outputs">
            <Input label="Local" class="fullWidth" :value="output.local" disabled :allowCopy="true" />
            <Input label="ISO" class="fullWidth outputInput" :value="output.iso" disabled :allowCopy="true" />
            <Input label="Relative" class="fullWidth outputInput" :value="output.relative" disabled :allowCopy="true" />
            <Input label="Unix Time" class="fullWidth outputInput" :value="output.unix" disabled :allowCopy="true" />
            <Input label="Day of year" class="fullWidth outputInput" :value="output.dayOfYear" disabled :allowCopy="true" />
            <Input label="Week Of Year" class="fullWidth outputInput" :value="output.weekOfYear" disabled
                :allowCopy="true" />
            <Input label="Is leap year?" class="fullWidth outputInput" :value="String(output.isLeapYear)" disabled
                :allowCopy="true" />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
}

.container .fullWidth {
    width: 100%;
}

.container .timezone {
    margin-top: 15px;
    flex-direction: column;
}

.outputInput {
    margin: 12.5px 0;
}

.fmts {
    border-radius: 5px;
}

.helper {
    margin-bottom: 5px;
}

.to-timezone {
    border-radius: 5px;
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }

    .to-timezone {
        margin-bottom: 15px;
    }
}
</style>