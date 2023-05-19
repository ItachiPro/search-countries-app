<template>
  <a-row type="flex" justify="center" align="center">
    <a-col :span="12"> <h1>Paises del mundo</h1></a-col>
  </a-row>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <a-input-search
        v-model="search"
        placeholder="Buscar"
        enter-button="Buscar"
        size="large"
        @search="searchCountry"
      />
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="12">
      <a-table :columns="headers" :data-source="countries">
        <template #flags="{ text }">
          <a-image :width="50" :src="text.png" :alt="text.alt" />
        </template>
        <template #name="{ text }">
          {{ text.official }}
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useCountry from "../composables/useCountry";

const { getCountries } = useCountry();

const search = ref("");
const countries = ref([]);
const headers = [
  {
    title: "#",
    dataIndex: "",
    key: "",
  },
  {
    title: "Bandera",
    dataIndex: "flags",
    slots: {
      customRender: "flags",
    },
  },
  {
    title: "Nombre",
    dataIndex: "name",
    slots: {
      customRender: "name",
    },
  },
  {
    title: "Población",
    dataIndex: "population",
  },
  {
    title: "",
    dataIndex: "",
  },
];

const searchCountry = async () => {
  //
};

const getAllCountries = async () => {
  const response = await getCountries();
  if (response.status === 200) {
    countries.value = response.data;
  }
};

onMounted(async () => {
  await getAllCountries();
});
</script>
