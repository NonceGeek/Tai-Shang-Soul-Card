defmodule CodesOnChain.DAOManager do
  @moduledoc """
  create a new DAOManager
  authority by ethereum signature, save a key value pair in K-V Table:
  gist_id --> github_id
  key: ethereum_addr, value: {github_id: github_id, gist_id: gist_id}
  """
  require Logger
  alias Components.{GistHandler, KVHandler, Verifier}
  @unsigned_msg_key "sign_msg_0x5e6d1ac9"
  @white_list %{
    gist_id: "16690f2a07c3d9bafe66682d6457c277",
    file_name: "white_list_for_dao_manager.json"
  }

  def get_module_doc(), do: @moduledoc

  def get_module(), do: Atom.to_string(__MODULE__)

  @doc """
    Create a new DAO after verify the ETH signatue and the msg sender.
  """
  def create_dao(addr, dao_info, signature) do
    %{admins: admins} = get_whitelist()

    # update dao info when the key does not exist
    with true <- Verifier.verify_message?(addr, dao_info, signature),
      KVHandler.put(add, dao_info, "DAOMaganer")
      # update unsigned message
      set_unsigned_msg()
    else
      error ->
        {:error, inspect(error)}
    end
  end

  @doc """
    get dao after verify the signatue and check if in the whitelist.
  """
  def get_dao(addr, msg, signature) do
    %{members: members} = get_white_list()

    with true <- Verifier.verify_message?(addr, msg, signature),
         true <- String.downcase(addr) in members do
      {:ok, KVHandler.get(add)}
    else
      error ->
        {:error, inspect(error)}
    end
  end

  @spec get_white_list() :: map()
  def get_whilte_list() do
    %{gist_id: gist_id, file_name: file_name} = @white_list
    %{files: files} = GistHandler.get_gist(gist_id)
    Logger.info(inspect(files))

    %{admins: admins, members: members} =
      files
      |> Map.get(String.to_atom(file_name))
      |> Map.get(:content)
      |> Poison.decode!()
      |> ExStructTranslator.to_atom_struct()

    %{admins: downcase(admins), members: downcase(members)}
  end

  def get_unsigned_msg() do
    do_get_unsigned_msg(KVHandler.get(@unsigned_msg_key))
  end

  defp do_get_unsigned_msg(nil), do: ""
  defp do_get_unsigned_msg(msg), do: msg

  defp set_unsigned_msg(), do: KVHandler.put(@unsigned_msg_key, rand_msg(), get_module())

  def rand_msg(byte_size), do: "0x" <> RandGen.gen_hex(byte_size)
  def rand_msg(), do: "0x" <> RandGen.gen_hex(32)
  defp downcase(addr_list), do: Enum.map(addr_list, &String.downcase(&1))

  # ---
  def test_set_unsigned_msg(), do: set_unsigned_msg()
end
