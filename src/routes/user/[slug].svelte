<script context="module">
    export async function load({ page }) {
      const { slug } = page.params
      return {
        status: 301,
        redirect: `/users/${slug}`,
      }
    }
  </script>