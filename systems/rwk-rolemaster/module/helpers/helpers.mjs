 /**
   * Helper to compose datasets available in the hbs.
   * @returns {Record<string, unknown>}
   * @protected
   */
  export function _getDatasets() {
    return {
      isSource: { source: true },
      notSource: { source: false },
    };
  }