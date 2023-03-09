<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useDropzone } from "vue3-dropzone";
import { useToast } from 'vue-toastification';
import { appSettingsStore } from '@/store/appSettingsStore';
import controlAPI from '@/api';
const appSettings = appSettingsStore();
const toast = useToast();
let images = ref([]);
const url = `${appSettings.getControlHTTPConn}/images`; // Your url on the server side
const uploadFiles = (files) => {
    for (var x = 0; x < files.length; x++) {
        const formData = new FormData(); // pass data as a form
        formData.append("image", files[x]);
        controlAPI
            .post(url, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.info(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

const getFiles = () => {
    controlAPI
        .get(url)
        .then((response) => {
            images.value = response.data;
        })
        .catch((err) => {
            console.error(err);
        });
};

const copyURL = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard');
};

const deleteImage = (name) => {
    controlAPI
        .delete(`${url}/${name}`)
        .then((response) => {
            console.info(response.data);
            toast.success('Deleted image');
        })
        .catch((err) => {
            console.error(err);
        });
}

function onDrop(acceptFiles, rejectReasons) {
    uploadFiles(acceptFiles);
    console.log(rejectReasons);
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

watch(isDragActive, () => {
    console.log('isDragActive', isDragActive.value);
});

let getFilesInterval;

onMounted(() => {
    getFiles();
    getFilesInterval = setInterval(() => {
        getFiles();
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(getFilesInterval);
});
</script>

<template>
    <div v-bind="getRootProps()" class="dropzone">
        <div class="border" :class="{
            isDragActive,
        }">
        </div>
        <input v-bind="getInputProps()" />
        <p v-if="isDragActive">Drop files here to upload</p>
        <p v-else>Drop files here to upload for team logos</p>
    </div>
    <div class="images">
        <div class="image" v-for="image in images" :key="image.name">
            <img @click="copyURL(image.public_url)" :src="image.public_url" class="image" />
            <p>{{ image.name }}</p>
            <button class="button danger imgDelete" @click="deleteImage(image.name)"><span
                    class="material-symbols-outlined">delete</span><span class="text">Delete</span></button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropzone,
.files {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    box-shadow: rgba(255, 255, 255, 0.6) 0px 1px 2px 0px,
        rgba(255, 255, 255, 0.15) 0px 1px 3px 1px;
    font-size: 1.5rem;
    text-align: center;
    line-height: 1.5;

    p {
        margin: 0;
        position: relative;
        top: -50px;
    }
}

.border {
    border: 2px dashed #ccc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    transition: all 0.3s ease;
    background-color: var(--etsu-secondary-bg);


    &.isDragActive {
        border: 2px dashed #ffb300;
        background: rgb(255 167 18 / 20%);
    }
}



div.images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 5px;

    div.image {
        margin: 4px;
        background-color: var(--etsu-secondary-bg);
        border-radius: 8px;
        outline: 2px solid var(--etsu-primary-gold);
        text-align: center;
        height: 100%;

        p {
            margin: 0;
        }

        .imgDelete {
            font-size: 20px;
            margin-top: 10px;
            width: 100%;

            .text {
                position: relative;
                top: -5px;
            }
        }

        img.image {
            max-width: 100px;
            max-height: 100px;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    div.image:hover {
        outline: 2px solid var(--etsu-primary-navy);
        background-color: var(--db-primary-bg);

    }
}</style>
