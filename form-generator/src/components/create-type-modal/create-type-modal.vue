<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Create Type" size="lg">
    <div class="modal-body">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            type="button"
            class="nav-link border-0 bg-transparent"
            :class="{ active: manualTypesVisible }"
            v-on:click="showManualTypes()"
          >
            <span class="nav-text">Manual</span>
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="nav-link border-0 bg-transparent"
            :class="{ active: catalogueTypesVisible }"
            v-on:click="showCatalogueTypes()"
          >
            <span class="nav-text">Catalogue</span>
          </button>
        </li>
        <li class="nav-item">
          <button
            type="button"
            class="nav-link border-0 bg-transparent"
            :class="{ active: sharedTypesVisible }"
            v-on:click="showSharedTypes()"
          >
            <span class="nav-text">Token</span>
          </button>
        </li>
      </ul>
      <div class="tab-content mt-5">
        <template v-if="manualTypesVisible">
          <div v-if="loadingAnything">
            <Spinner />
          </div>
          <template v-if="!loadingAnything">
            <div class="form-group row">
              <label for="inputID" class="col-sm-3 col-form-label">ID</label>
              <div class="col-sm-9">
                <input
                  id="inputID"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': isInvalidTypeId }"
                  v-model="newTypeId"
                  placeholder="ID"
                />
                <div v-if="duplicateTypeId" class="invalid-feedback">
                  A type with this ID already exists. Please choose another.
                </div>
                <div v-if="missingTypeId" class="invalid-feedback">
                  Please provide a type ID
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputName" class="col-sm-3 col-form-label"
                >Name</label
              >
              <div class="col-sm-9">
                <input
                  id="inputName"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': isInvalidTypeName }"
                  v-model="newTypeName"
                  placeholder="Name"
                />
                <div v-if="missingTypeName" class="invalid-feedback">
                  Please provide a type name
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputDescription" class="col-sm-3 col-form-label"
                >Description</label
              >
              <div class="col-sm-9">
                <input
                  id="inputDescription"
                  type="text"
                  class="form-control"
                  v-model="newTypeDescription"
                  placeholder="Description"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12">
                <label class="col-form-label">Attributes</label>
                <table class="table">
                  <thead>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Key</th>
                    <th scope="col">Description</th>
                    <th scope="col">UoM</th>
                    <th scope="col">Type</th>
                    <th scope="col"></th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(property, index) in newTypeProperties"
                      :key="index"
                    >
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="property.Id"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="property.Name"
                        />
                      </td>
                      <td style="vertical-align: middle">
                        <div class="d-flex align-items-center">
                          <span class="switch mb-5">
                            <label>
                              <input
                                type="checkbox"
                                :checked="property.IsKey"
                                v-on:change="togglePropertyIsKey(index)"
                                name="propertyKey"
                              />
                              <span></span>
                            </label>
                          </span>
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="property.Description"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="property.Uom"
                        />
                      </td>
                      <td>
                        <div>
                          <dropdown
                            :text="getPropertySdsTypeDisplayText(property)"
                            variant="secondary"
                            :boundary="'window'"
                            :id="'typeTypeSelectorDropdown'"
                          >
                            <dropdown-item-button
                              v-for="(
                                sdsPropertySdsType, i
                              ) in sdsPropertySdsTypes"
                              v-on:click="
                                setPropertySdsType(index, sdsPropertySdsType)
                              "
                              :key="i"
                            >
                              {{ sdsPropertySdsType }}
                            </dropdown-item-button>
                          </dropdown>
                        </div>
                      </td>
                      <td style="vertical-align: middle">
                        <button
                          type="button"
                          class="btn btn-sm btn-icon btn-light-danger"
                          v-on:click="removeProperty(index)"
                        >
                          <i class="flaticon2-delete"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="addProperty"
                >
                  Add Attribute
                </button>
                <div
                  v-if="missingAttributeKey"
                  class="invalid-feedback d-block"
                >
                  Exactly one attribute must be the key
                </div>
              </div>
            </div>
          </template>
        </template>
        <template v-if="catalogueTypesVisible">
          <div class="jumbotron">
            <h6 class="display-4">Cultivating...</h6>
            <hr />
            <p class="lead m-0">Check back soon!</p>
          </div>
        </template>
        <template v-if="sharedTypesVisible">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Token</label>
            <div class="col-sm-9">
              <dropdown
                :text="tokenDropdownText"
                variant="secondary"
                :key="token.id"
              >
                <dropdown-item-button
                  v-for="(token, index) in tokens"
                  v-on:click="selectedToken = token"
                  :key="index"
                >
                  {{ token.name }}
                </dropdown-item-button>
              </dropdown>
            </div>
          </div>
          <div v-if="loadingAnything">
            <Spinner />
          </div>
          <div v-if="selectedToken && !loadingAnything" class="row">
            <div class="col-12">
              <div class="accordion" role="tablist">
                <b-card
                  no-body
                  class="mb-1"
                  v-for="sdsType in tokenSdsTypes"
                  :key="sdsType.Id"
                >
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex align-items-center">
                        <span class="font-weight-boldest ml-3">
                          {{ sdsType.Name }}
                        </span>
                        <small class="text-muted ml-3">
                          {{ sdsType.Description }}
                        </small>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="btn btn-clean btn-sm font-weight-bold font-size-base"
                          v-b-toggle="'accordion-' + sdsType.Id"
                        >
                          Show Attributes
                        </button>
                        <button
                          type="button"
                          class="btn btn-link-success font-weight-boldest mr-3"
                          v-on:click="importFromToken(sdsType)"
                        >
                          Import
                        </button>
                      </div>
                    </div>
                  </b-card-header>
                  <b-collapse
                    :id="'accordion-' + sdsType.Id"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <table class="table">
                        <thead>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Key</th>
                          <th scope="col">Description</th>
                          <th scope="col">UoM</th>
                          <th scope="col">Type</th>
                        </thead>
                        <tbody>
                          <tr
                            v-for="property in sdsType.Properties"
                            :key="property.Id"
                          >
                            <td>{{ property.Id }}</td>
                            <td>{{ property.Name }}</td>
                            <td>
                              <span
                                v-if="property.IsKey"
                                class="badge badge-success"
                              >
                                Yes
                              </span>
                              <span
                                v-if="!property.IsKey"
                                class="badge badge-light"
                              >
                                No
                              </span>
                            </td>
                            <td>{{ property.Description }}</td>
                            <td>
                              {{ property.Uom }}
                            </td>
                            <td>
                              {{ getSdsType(property.SdsType.SdsTypeCode) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
        Cancel
      </button>
      <button
        v-if="manualTypesVisible"
        type="button"
        class="btn btn-success"
        v-on:click="handleSubmit"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<style lang="scss">
#typeTypeSelectorDropdown {
  ul {
    overflow: auto !important;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";

import {
  IAPIResponse,
  APIResponseStatus,
  ISdsType,
  ISdsStream,
  IProject,
} from "@/models";
import { IAsset } from "@/shared/models";
import { Spinner } from "@/components/spinner";
import {
  sdsTypes as sdsPropertySdsTypesMap,
  getSdsTypeByTypeCode,
} from "@/services/sds-mapping";

interface ICreateTypeModalData {
  newTypeId: string;
  newTypeName: string;
  newTypeDescription: string;
  newTypeProperties: any[];
  wasValidated: boolean;
  missingTypeId: boolean;
  missingTypeName: boolean;
  duplicateTypeId: boolean;
  missingAttributeKey: boolean;
  manualTypesVisible: boolean;
  catalogueTypesVisible: boolean;
  sharedTypesVisible: boolean;
  selectedToken: any;
  tokenSdsTypes: ISdsType[];
  loadingTokenTypes: boolean;
  sdsPropertySdsTypes: string[];
}

export default defineComponent({
  components: {
    Spinner,
  },
  computed: {
    isInvalidTypeId: function (): boolean {
      return this.wasValidated && (this.missingTypeId || this.duplicateTypeId);
    },
    isInvalidTypeName: function (): boolean {
      return this.wasValidated && this.missingTypeName;
    },
    tokenDropdownText: function (): string {
      return this.selectedToken ? this.selectedToken.name : "Select a token";
    },
    loadingAnything: function (): boolean {
      return this.loading || this.loadingTokenTypes;
    },
  },
  data: function (): ICreateTypeModalData {
    return {
      newTypeId: "",
      newTypeName: "",
      newTypeDescription: "",
      newTypeProperties: [],
      wasValidated: false,
      missingTypeId: true,
      missingTypeName: true,
      duplicateTypeId: false,
      missingAttributeKey: false,
      manualTypesVisible: true,
      catalogueTypesVisible: false,
      sharedTypesVisible: false,
      selectedToken: undefined,
      tokenSdsTypes: [],
      loadingTokenTypes: false,
      sdsPropertySdsTypes: Object.values(sdsPropertySdsTypesMap),
    };
  },
  methods: {
    showManualTypes: function (): void {
      this.manualTypesVisible = true;
      this.catalogueTypesVisible = false;
      this.sharedTypesVisible = false;
    },
    showCatalogueTypes: function (): void {
      this.manualTypesVisible = false;
      this.catalogueTypesVisible = true;
      this.sharedTypesVisible = false;
    },
    showSharedTypes: function (): void {
      this.manualTypesVisible = false;
      this.catalogueTypesVisible = false;
      this.sharedTypesVisible = true;
    },
    validate: function (): boolean {
      this.missingTypeId = !this.newTypeId;
      this.missingTypeName = !this.newTypeName;
      this.duplicateTypeId = !!this.sdsTypes.find(
        (item: ISdsType) => item.Id === this.newTypeId
      );
      this.missingAttributeKey =
        !!this.newTypeProperties.length &&
        this.newTypeProperties.reduce((count: number, property: any) => {
          return property.IsKey ? count + 1 : count;
        }, 0) !== 1;

      this.wasValidated = true;

      return !(
        this.missingTypeId ||
        this.missingTypeName ||
        this.duplicateTypeId ||
        this.missingAttributeKey
      );
    },
    handleSubmit: function (): void {
      if (this.validate()) {
        const newType: ISdsType = {
          Id: this.newTypeId,
          Name: this.newTypeName,
          Description: this.newTypeDescription,
          Properties: this.newTypeProperties.map((property: any) => {
            return {
              ...property,
              SdsType: {
                Description: property.Description,
                Id: `${this.newTypeId}.${property.Id}`,
                Name: property.Name,
                SdsTypeCode: property.SdsType.SdsTypeCode,
              },
            };
          }),
        };

        this.onCreateType(newType);
      }
    },
    getTokenSdsTypes: async function (token: any): Promise<ISdsType[]> {
      const authorization = `Bearer ${token.token}`;

      const assetsResponse: IAPIResponse = await axios.get(`/sharing/assets`, {
        headers: {
          Authorization: authorization,
        },
      });

      if (assetsResponse.status === APIResponseStatus.SUCCESS) {
        const asset: IAsset = assetsResponse.data.assets[0];

        const sdsTypesResponse: IAPIResponse = await axios.get(
          `/sharing/assets/${asset.id}/types`,
          {
            headers: {
              Authorization: authorization,
            },
          }
        );

        if (sdsTypesResponse.status === APIResponseStatus.SUCCESS) {
          const sdsTypes: ISdsType[] = sdsTypesResponse.data.sdsTypes;

          return sdsTypes;
        } else {
          return Promise.resolve([]);
        }
      } else {
        return Promise.resolve([]);
      }
    },
    getSdsType: function (typeCode: string) {
      return getSdsTypeByTypeCode(typeCode);
    },
    addProperty: function (): void {
      this.newTypeProperties = this.newTypeProperties.concat({
        Id: "",
        Name: "",
        Description: "",
        IsKey: false,
        Uom: "",
      });
    },
    removeProperty: function (index: number): void {
      this.newTypeProperties = this.newTypeProperties.filter(
        (_, i) => i !== index
      );
    },
    getPropertySdsTypeDisplayText: function (property: any): string {
      if (property.SdsType) {
        return sdsPropertySdsTypesMap[property.SdsType.SdsTypeCode.toString()];
      } else {
        return "Select a type";
      }
    },
    setPropertySdsType: function (
      index: number,
      sdsPropertySdsType: string
    ): void {
      this.newTypeProperties = this.newTypeProperties.map(
        (property: any, i: number) => {
          if (i === index) {
            const sdsTypeCode: number = Object.keys(
              sdsPropertySdsTypesMap
            ).reduce((code: number, key: string) => {
              if (sdsPropertySdsTypesMap[key] === sdsPropertySdsType) {
                return Number(key);
              } else {
                return code;
              }
            }, 0);

            return {
              ...property,
              SdsType: {
                SdsTypeCode: sdsTypeCode,
              },
            };
          } else {
            return property;
          }
        }
      );
    },
    togglePropertyIsKey: function (index: number): void {
      this.newTypeProperties = this.newTypeProperties.map(
        (property: any, i: number) => {
          if (i === index) {
            return {
              ...property,
              IsKey: !property.IsKey,
            };
          } else {
            return {
              ...property,
              IsKey: false,
            };
          }
        }
      );
    },
    importFromToken: function (sdsType: ISdsType): void {
      this.onCreateType(sdsType);
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    sdsTypes: {
      type: Array as PropType<ISdsType[]>,
      required: true,
    },
    onCreateType: {
      type: Function as PropType<(sdsType: ISdsType) => void>,
      required: true,
    },
    sdsStreams: {
      type: Array as PropType<ISdsStream[]>,
      required: true,
    },
    tokens: {
      type: Array as PropType<any[]>,
      required: true,
    },
    loading: Boolean,
  },
  watch: {
    selectedToken: {
      handler: async function () {
        if (this.selectedToken) {
          this.loadingTokenTypes = true;
          this.tokenSdsTypes = await this.getTokenSdsTypes(this.selectedToken);
          this.loadingTokenTypes = false;
        }
      },
      deep: true,
    },
  },
});
</script>
