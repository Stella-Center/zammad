// Copyright (C) 2012-2024 Zammad Foundation, https://zammad-foundation.org/

import type { FormRef, FormValues } from '#shared/components/Form/types.ts'

export interface TaskbarTabDetailDataLoader {}

export type TaskbarTabDetailDataLoaderComposable =
  () => TaskbarTabDetailDataLoader

export interface TaskbarTabContext {
  form?: FormRef
  formValues?: FormValues
  formIsDirty?: boolean

  // Add generic properties to the context (e.g. overview information in ticket detail view context).
  [index: string]: unknown
}