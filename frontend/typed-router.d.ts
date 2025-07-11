/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/addAgent': RouteRecordInfo<'/addAgent', '/addAgent', Record<never, never>, Record<never, never>>,
    '/addAgentRight': RouteRecordInfo<'/addAgentRight', '/addAgentRight', Record<never, never>, Record<never, never>>,
    '/agent/[agent_id]': RouteRecordInfo<'/agent/[agent_id]', '/agent/:agent_id', { agent_id: ParamValue<true> }, { agent_id: ParamValue<false> }>,
    '/agents': RouteRecordInfo<'/agents', '/agents', Record<never, never>, Record<never, never>>,
    '/manageTemplates': RouteRecordInfo<'/manageTemplates', '/manageTemplates', Record<never, never>, Record<never, never>>,
  }
}
