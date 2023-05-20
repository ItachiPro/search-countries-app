<template>
  <a-row type="flex" justify="center" align="center">
    <a-col :span="12">
      <a-typography-title>Paises del mundo</a-typography-title></a-col
    >
  </a-row>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <a-input-search
        v-model:value="search"
        placeholder="Buscar"
        enter-button="Buscar"
        size="large"
        @search="searchCountry"
      />
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="12"><a-divider /></a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="12">
      <a-table :columns="headers" :data-source="countries">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'correlative'">
            {{ numeration(index) }}
          </template>
          <template v-if="column.key === 'flags'">
            <a-image
              :width="50"
              :src="record.flags.png"
              :alt="record.flags.alt"
            />
          </template>
          <template v-if="column.key === 'name'">
            {{ `${record.name.common}, ${record.capital}` }}
          </template>
          <template v-if="column.key === 'action'">
            <a @click="getCountryByCode(record.cca2)">Ver...</a>
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>
  <a-modal v-model:open="visible" :footer="null" width="30%">
    <template #title>
      <a-typography-title :level="2">{{
        `País: ${country?.name?.common}`
      }}</a-typography-title>
    </template>
    <table>
      <tr>
        <td>
          <a-typography-title :level="3">Bandera</a-typography-title>
        </td>
        <td></td>
        <td>
          <a-typography-title :level="3">Información</a-typography-title>
        </td>
      </tr>
      <tr>
        <td>
          <a-image
            :width="250"
            :src="country?.flags?.png"
            :alt="country?.flags?.alt"
          />
        </td>
        <td></td>
        <td>
          <a-list size="small" bordered :data-source="information">
            <template #renderItem="{ item }">
              <a-list-item>{{ item }}</a-list-item>
            </template>
          </a-list>
        </td>
      </tr>
    </table>
    <a-row>
      <a-col :span="12">
        <a-typography-title :level="2">Traducción</a-typography-title>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col
        class="gutter-row"
        :span="6"
        v-for="(tran, i) in country?.translations"
        :key="i"
      >
        <a-tag color="#108ee9">{{ tran.official }}</a-tag>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import useCountry from "../composables/useCountry";

const store = useStore();

const { getCountries, getCountry, getCountryByName } = useCountry();

const search = ref(null);
const countries = ref([]);
const country = ref({});
const information = ref([]);
const visible = ref(false);
const headers = [
  {
    title: "#",
    dataIndex: "correlative",
    key: "correlative",
  },
  {
    title: "Bandera",
    dataIndex: "flags",
    key: "flags",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Población",
    dataIndex: "population",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

const numeration = (value) => {
  return value + 1;
};

const searchCountry = async () => {
  if (search.value !== "" && search.value !== null) {
    store.dispatch("loading", true);
    const response = await getCountryByName(search.value);
    store.dispatch("loading", false);
    if (response.status === 200) {
      countries.value = response.data;
    }
  }
};

const getAllCountries = async () => {
  store.dispatch("loading", true);
  const response = await getCountries();
  store.dispatch("loading", false);
  if (response.status === 200) {
    countries.value = response.data;
  }
};

const getCountryByCode = async (code) => {
  store.dispatch("loading", true);
  const response = await getCountry(code);
  store.dispatch("loading", false);
  if (response.status === 200) {
    cleanCountry();
    country.value = response.data[0];
    information.value.push(`Población: ${country.value?.population}`);
    information.value.push(`Código Númerico: ${country.value?.ccn3}`);
    information.value.push(`Código alpha2: ${country.value?.cca2}`);
    visible.value = true;
  }
};

const cleanCountry = () => {
  country.value = {};
  information.value = [];
};

watch(search, async () => {
  if (search.value === null || search.value === "") {
    await getAllCountries();
  }
});

onMounted(async () => {
  await getAllCountries();
});
</script>
